import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { api } from '../api';

const ContactModal = ({ onClose }) => {
  const { triggerToast, refreshAll } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id.replace('con-', '')]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.createContact(formData);
      triggerToast('Contact saved', 'success');
      await refreshAll();
      onClose();
    } catch (e) {
      triggerToast('Failed to save contact', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add Contact</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field-row-inline">
            <div className="field-row">
              <label>Name</label>
              <input type="text" id="con-name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
            </div>
            <div className="field-row">
              <label>Company (Optional)</label>
              <input type="text" id="con-company" value={formData.company} onChange={handleChange} placeholder="Current employer" />
            </div>
          </div>
          <div className="field-row">
            <label>Email</label>
            <input type="email" id="con-email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
          </div>
          <div className="field-row">
            <label>Notes</label>
            <input type="text" id="con-notes" value={formData.notes} onChange={handleChange} placeholder="Met at networking event..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
