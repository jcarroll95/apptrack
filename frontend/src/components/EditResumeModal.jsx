import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const EditResumeModal = ({ resume, onClose }) => {
  const { updateResumeVariant } = useAppContext();

  const [formData, setFormData] = useState({
    versionLabel: resume.versionLabel ?? '',
    dateCreated: resume.dateCreated ?? '',
    changeSummary: resume.changeSummary ?? '',
    fileUrl: resume.fileUrl ?? '',
    contentText: resume.contentText ?? ''
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateResumeVariant(resume.id, {
        versionLabel: formData.versionLabel,
        dateCreated: formData.dateCreated || null,
        changeSummary: formData.changeSummary || null,
        fileUrl: formData.fileUrl || null,
        contentText: formData.contentText || null
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Edit Resume Variant</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="field-row">
            <label>Version Label</label>
            <input
              type="text"
              name="versionLabel"
              value={formData.versionLabel}
              onChange={handleChange}
              placeholder="e.g. SE - General, Frontend Focus..."
            />
          </div>
          <div className="field-row">
            <label>Date Created</label>
            <input
              type="date"
              name="dateCreated"
              value={formData.dateCreated}
              onChange={handleChange}
            />
          </div>
          <div className="field-row">
            <label>Change Summary</label>
            <textarea
              name="changeSummary"
              value={formData.changeSummary}
              onChange={handleChange}
              placeholder="What changed in this version..."
            />
          </div>
          <div className="field-row">
            <label>File URL</label>
            <input
              type="text"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              placeholder="Google Drive, S3, etc."
            />
          </div>
          <div className="field-row">
            <label>Resume Text</label>
            <textarea
              name="contentText"
              value={formData.contentText}
              onChange={handleChange}
              placeholder="Paste resume content here…"
              rows={10}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" disabled={saving} onClick={handleSave}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditResumeModal;
