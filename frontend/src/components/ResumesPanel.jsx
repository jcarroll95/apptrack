import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import EditResumeModal from './EditResumeModal';

const ResumesPanel = () => {
  const { resumeVariants, softDeleteResumeVariant, restoreResumeVariant } = useAppContext();
  const [editingResume, setEditingResume] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const byDate = (a, b) => {
    if (!a.dateCreated && !b.dateCreated) return 0;
    if (!a.dateCreated) return 1;
    if (!b.dateCreated) return -1;
    return new Date(b.dateCreated) - new Date(a.dateCreated);
  };

  const active  = [...resumeVariants].filter(rv => !rv.deleted).sort(byDate);
  const deleted = [...resumeVariants].filter(rv =>  rv.deleted).sort(byDate);

  return (
    <div className="panel">
      <div className="panel-title">Resume Variants</div>

      {active.length === 0 ? (
        <div className="empty-state">No resume variants</div>
      ) : (
        <>
          <div className="resume-header">
            <span>Version</span>
            <span>Created</span>
            <span>Change Summary</span>
            <span>File URL</span>
            <span />
          </div>
          {active.map(rv => (
            <div key={rv.id} className="resume-row">
              <div className="resume-label">{rv.versionLabel}</div>
              <div className="resume-date">{rv.dateCreated ?? '—'}</div>
              <div className="resume-summary">{rv.changeSummary ?? '—'}</div>
              <div className="resume-url">{rv.fileUrl ?? '—'}</div>
              <div className="row-actions">
                <button className="edit-app-btn" onClick={() => setEditingResume(rv)}>✎</button>
                <button className="delete-row-btn" onClick={() => softDeleteResumeVariant(rv.id)}>🗑</button>
              </div>
            </div>
          ))}
        </>
      )}

      {deleted.length > 0 && (
        <div className="recover-section">
          <button className="recover-toggle" onClick={() => setShowDeleted(v => !v)}>
            {showDeleted ? '▾' : '▸'} Recover deleted ({deleted.length})
          </button>
          {showDeleted && (
            <div className="recover-list">
              {deleted.map(rv => (
                <div key={rv.id} className="recover-row">
                  <span className="recover-label">{rv.versionLabel}</span>
                  <button className="restore-btn" onClick={() => restoreResumeVariant(rv.id)}>Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {editingResume && (
        <EditResumeModal resume={editingResume} onClose={() => setEditingResume(null)} />
      )}
    </div>
  );
};

export default ResumesPanel;
