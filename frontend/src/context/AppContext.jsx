import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [resumeVariants, setResumeVariants] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDimension, setActiveDimension] = useState('segment');

  const triggerToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      const [apps, comps, conts, resumes] = await Promise.all([
        api.fetchApplications(),
        api.fetchCompanies(),
        api.fetchContacts(),
        api.fetchResumeVariants()
      ]);
      setApplications(apps);
      setCompanies(comps);
      setContacts(conts);
      setResumeVariants(resumes);
    } catch (e) {
      console.error('Failed to load data', e);
      triggerToast('Could not load data from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const createFullApplication = async (formData) => {
    setLoading(true);
    try {
      let companyId = formData.companyId;
      if (!companyId && formData.companyName) {
        const newCompany = await api.createCompany({
          name: formData.companyName,
          size: formData.companySize,
          segment: formData.companySegment
        });
        companyId = newCompany.id;
      }

      if (!companyId) {
        throw new Error('Company is required');
      }

      const jobListing = await api.createJobListing({
        company: { id: companyId },
        title: formData.role,
        experienceLevel: formData.experienceLevel,
        dateDiscovered: formData.postedDate,
        url: formData.externalUrl,
        roleType: 'OTHER' 
      });

      await api.createApplication({
        jobListing: { id: jobListing.id },
        resumeVariant: { id: parseInt(formData.resumeVariantId) },
        contact: formData.contactId ? { id: formData.contactId } : null,
        sourceChannel: formData.sourceType,
        referred: formData.sourceType === 'REFERRAL',
        dateSubmitted: formData.dateSubmitted,
        currentStage: 'SUBMITTED',
        active: true
      });

      triggerToast('Application saved successfully', 'success');
      await refreshAll();
      return true;
    } catch (e) {
      console.error('Failed to save application', e);
      triggerToast('Failed to save application', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const transitionStage = async (id, stage, notes = '', date = '') => {
    try {
      await api.transitionStage(id, stage, notes, date);
      triggerToast(`Stage updated to ${stage}`, 'success');
      await refreshAll();
    } catch (e) {
      console.error('Failed to transition stage', e);
      triggerToast('Failed to update stage', 'error');
    }
  };

  return (
    <AppContext.Provider value={{
      applications, companies, contacts, resumeVariants,
      toasts, loading, activeDimension, setActiveDimension,
      triggerToast, refreshAll, createFullApplication, transitionStage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
