import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../api';

const CompanyModal = ({ onClose }) => {
  const { triggerToast, refreshAll } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    size: 'MEDIUM',
    segment: 'TECH'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id.replace('comp-', '')]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createCompany(formData);
      triggerToast('Company created', 'success');
      await refreshAll();
      onClose();
    } catch (e) {
      triggerToast('Failed to create company', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Company</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field-row">
            <label>Company Name</label>
            <input type="text" id="comp-name" value={formData.name} onChange={handleChange} placeholder="e.g. Acme Corp" />
          </div>
          <div className="field-row-inline">
            <div className="field-row">
              <label>Size</label>
              <select id="comp-size" value={formData.size} onChange={handleChange}>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
              </select>
            </div>
            <div className="field-row">
              <label>Segment</label>
              <select id="comp-segment" value={formData.segment} onChange={handleChange}>
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
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Company'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
