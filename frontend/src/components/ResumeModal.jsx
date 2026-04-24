import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../api';

const ResumeModal = ({ onClose }) => {
  const { triggerToast, refreshAll } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    versionLabel: '',
    externalUrl: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id.replace('rv-', '')]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createResumeVariant(formData);
      triggerToast('Resume variant saved', 'success');
      await refreshAll();
      onClose();
    } catch (e) {
      triggerToast('Failed to save resume variant', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Resume Variant</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field-row">
            <label>Version Label</label>
            <input type="text" id="rv-versionLabel" value={formData.versionLabel} onChange={handleChange} placeholder="e.g. SE - General, Frontend Focus..." />
          </div>
          <div className="field-row">
            <label>External URL</label>
            <input type="text" id="rv-externalUrl" value={formData.externalUrl} onChange={handleChange} placeholder="Google Drive link, S3 URL, etc." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Resume Variant'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
