import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ApplicationModal = ({ onClose }) => {
  const { companies, contacts, resumeVariants, createFullApplication, loading } = useAppContext();
  
  const [formData, setFormData] = useState({
    companyId: '',
    companyName: '',
    companySize: 'MEDIUM',
    companySegment: 'TECH',
    role: '',
    experienceLevel: 'MID',
    postedDate: new Date().toISOString().split('T')[0],
    externalUrl: '',
    contactId: '',
    resumeVariantId: resumeVariants[0]?.id || '',
    sourceType: 'COLD',
    referral: '',
    dateSubmitted: new Date().toISOString().split('T')[0]
  });

  const [showCompanyFields, setShowCompanyFields] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('app-', '');
    setFormData(prev => ({ ...prev, [field]: value }));

    if (id === 'app-companyId') {
      setShowCompanyFields(value === '');
    }
  };

  const handleSubmit = async () => {
    const success = await createFullApplication(formData);
    if (success) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">New Application</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field-row">
            <label>Company</label>
            <select id="app-companyId" value={formData.companyId} onChange={handleChange}>
              <option value="">+ New Company</option>
              {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {showCompanyFields && (
            <div className="field-row-inline">
              <div className="field-row">
                <label>Name</label>
                <input type="text" id="app-companyName" value={formData.companyName} onChange={handleChange} />
              </div>
      <div className="field-row">
        <label>Size</label>
        <select id="app-companySize" value={formData.companySize} onChange={handleChange}>
          <option value="SMALL">Small</option>
          <option value="MEDIUM">Medium</option>
          <option value="LARGE">Large</option>
        </select>
      </div>
      <div className="field-row">
        <label>Segment</label>
        <select id="app-companySegment" value={formData.companySegment} onChange={handleChange}>
          <option value="TECH">Tech</option>
          <option value="FINTECH">Fintech</option>
          <option value="FINANCE">Finance</option>
          <option value="DEFENSE">Defense</option>
          <option value="HEALTHCARE">Healthcare</option>
          <option value="ENTERPRISE">Enterprise</option>
          <option value="STARTUP">Startup</option>
          <option value="EDUCATION">Education</option>
          <option value="CONSULTING">Consulting</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
            </div>
          )}

          <div className="field-row">
            <label>Role</label>
            <input type="text" id="app-role" value={formData.role} onChange={handleChange} placeholder="Software Engineer" />
          </div>

          <div className="field-row-inline">
            <div className="field-row">
              <label>Exp Level</label>
              <select id="app-experienceLevel" value={formData.experienceLevel} onChange={handleChange}>
                <option value="JUNIOR">Junior</option>
                <option value="MID">Mid</option>
                <option value="SENIOR">Senior</option>
              </select>
            </div>
      <div className="field-row">
        <label>Source</label>
        <select id="app-sourceType" value={formData.sourceType} onChange={handleChange}>
          <option value="COLD">Cold</option>
          <option value="REFERRAL">Referral</option>
          <option value="RECRUITER_OUTREACH">Recruiter Outreach</option>
          <option value="JOB_BOARD">Job Board</option>
        </select>
      </div>
          </div>

          <div className="field-row">
            <label>Job Link</label>
            <input type="text" id="app-externalUrl" value={formData.externalUrl} onChange={handleChange} placeholder="https://..." />
          </div>

          <div className="field-row-inline">
            <div className="field-row">
              <label>Posted Date</label>
              <input type="date" id="app-postedDate" value={formData.postedDate} onChange={handleChange} />
            </div>
            <div className="field-row">
              <label>Date Applied</label>
              <input type="date" id="app-dateSubmitted" value={formData.dateSubmitted} onChange={handleChange} />
            </div>
          </div>

          <div className="field-row-inline">
            <div className="field-row">
              <label>Contact</label>
              <select id="app-contactId" value={formData.contactId} onChange={handleChange}>
                <option value="">None</option>
                {contacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="field-row">
              <label>Resume</label>
              <select id="app-resumeVariantId" value={formData.resumeVariantId} onChange={handleChange}>
                {resumeVariants.map(r => <option key={r.id} value={r.id}>{r.versionLabel}</option>)}
              </select>
            </div>
          </div>

          <div className="field-row">
            <label>Referrer Name</label>
            <input type="text" id="app-referral" value={formData.referral} onChange={handleChange} disabled={formData.sourceType !== 'REFERRAL'} />
            <div className="field-hint">Only required if Source is Referral</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Create Application'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
