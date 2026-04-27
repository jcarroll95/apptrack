import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import AppHeader from './AppHeader';
import CohortPanel from './CohortPanel';
import ActivePanel from './ActivePanel';
import ResumesPanel from './ResumesPanel';
import ContactsPanel from './ContactsPanel';
import ToastContainer from './ToastContainer';
import ApplicationModal from './ApplicationModal';
import CompanyModal from './CompanyModal';
import ContactModal from './ContactModal';
import ResumeModal from './ResumeModal';

const App = () => {
  const { activeDimension, setActiveDimension } = useAppContext();
  const [activeModal, setActiveModal] = useState(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error('Captured global error:', error);
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  const handleOpenModal = (modalType) => setActiveModal(modalType);
  const handleCloseModal = () => setActiveModal(null);

  if (hasError) {
    return (
      <div className="app-container" style={{ padding: '20px', color: 'white', textAlign: 'center' }}>
        <h2>Something went wrong.</h2>
        <p>The application encountered a runtime error.</p>
        <button onClick={() => window.location.reload()} className="cohort-btn active">Reload Page</button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <AppHeader onOpenModal={handleOpenModal} />
      
      <div className="cohort-selector">
        <button 
          className={`cohort-btn ${activeDimension === 'segment' ? 'active' : ''}`}
          onClick={() => setActiveDimension('segment')}
        >
          Market Segment
        </button>
        <button 
          className={`cohort-btn ${activeDimension === 'resumeVariant' ? 'active' : ''}`}
          onClick={() => setActiveDimension('resumeVariant')}
        >
          Resume Variant
        </button>
        <button 
          className={`cohort-btn ${activeDimension === 'roleType' ? 'active' : ''}`}
          onClick={() => setActiveDimension('roleType')}
        >
          Role Type
        </button>
        <button
          className={`cohort-btn ${activeDimension === 'channel' ? 'active' : ''}`}
          onClick={() => setActiveDimension('channel')}
        >
          Channel
        </button>
        <button
          className={`cohort-btn ${activeDimension === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveDimension('applications')}
        >
          Applications
        </button>
        <button
          className={`cohort-btn ${activeDimension === 'resumes' ? 'active' : ''}`}
          onClick={() => setActiveDimension('resumes')}
        >
          Resumes
        </button>
        <button
          className={`cohort-btn ${activeDimension === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveDimension('contacts')}
        >
          Contacts
        </button>
      </div>

      <main className="main">
        {activeDimension === 'applications' ? <ActivePanel />
          : activeDimension === 'resumes' ? <ResumesPanel />
          : activeDimension === 'contacts' ? <ContactsPanel />
          : <CohortPanel />}
      </main>

      <ToastContainer />

      {activeModal === 'application' && <ApplicationModal onClose={handleCloseModal} />}
      {activeModal === 'company' && <CompanyModal onClose={handleCloseModal} />}
      {activeModal === 'contact' && <ContactModal onClose={handleCloseModal} />}
      {activeModal === 'resume' && <ResumeModal onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
