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

  const updateApplication = async (id, data) => {
    try {
      await api.updateApplication(id, data);
      triggerToast('Application updated', 'success');
      await refreshAll();
    } catch (e) {
      console.error('Failed to update application', e);
      triggerToast('Failed to update application', 'error');
    }
  };

  const softDeleteApplication = async (id) => {
    try {
      await api.updateApplication(id, { deleted: true });
      triggerToast('Application deleted', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to delete application', 'error');
    }
  };

  const restoreApplication = async (id) => {
    try {
      await api.updateApplication(id, { deleted: false });
      triggerToast('Application restored', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to restore application', 'error');
    }
  };

  const softDeleteResumeVariant = async (id) => {
    try {
      await api.updateResumeVariant(id, { deleted: true });
      triggerToast('Resume variant deleted', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to delete resume variant', 'error');
    }
  };

  const restoreResumeVariant = async (id) => {
    try {
      await api.updateResumeVariant(id, { deleted: false });
      triggerToast('Resume variant restored', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to restore resume variant', 'error');
    }
  };

  const softDeleteContact = async (id) => {
    try {
      await api.updateContact(id, { deleted: true });
      triggerToast('Contact deleted', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to delete contact', 'error');
    }
  };

  const restoreContact = async (id) => {
    try {
      await api.updateContact(id, { deleted: false });
      triggerToast('Contact restored', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to restore contact', 'error');
    }
  };

  const updateContact = async (id, data) => {
    try {
      await api.updateContact(id, data);
      triggerToast('Contact updated', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to update contact', 'error');
    }
  };

  const updateResumeVariant = async (id, data) => {
    try {
      await api.updateResumeVariant(id, data);
      triggerToast('Resume variant updated', 'success');
      await refreshAll();
    } catch (e) {
      triggerToast('Failed to update resume variant', 'error');
    }
  };

  const updateJobListing = async (id, data) => {
    try {
      await api.updateJobListing(id, data);
      await refreshAll();
    } catch (e) {
      console.error('Failed to update job listing', e);
      triggerToast('Failed to update job listing', 'error');
      throw e;
    }
  };

  return (
    <AppContext.Provider value={{
      applications, companies, contacts, resumeVariants,
      toasts, loading, activeDimension, setActiveDimension,
      triggerToast, refreshAll, createFullApplication, transitionStage,
      updateApplication, updateJobListing,
      updateResumeVariant, softDeleteResumeVariant, restoreResumeVariant,
      updateContact, softDeleteContact, restoreContact,
      softDeleteApplication, restoreApplication
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
