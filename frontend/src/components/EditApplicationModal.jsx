import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { STAGE_LABELS, NEXT_STAGES } from '../constants';

const SOURCE_CHANNEL_LABELS = {
  COLD: 'Cold Apply',
  REFERRAL: 'Referral',
  RECRUITER_OUTREACH: 'Recruiter Outreach',
  JOB_BOARD: 'Job Board'
};

const ROLE_TYPE_LABELS = {
  BACKEND: 'Backend',
  FULLSTACK: 'Fullstack',
  PLATFORM: 'Platform',
  DEVOPS: 'DevOps',
  OTHER: 'Other'
};

const ALL_STAGES = [
  'SUBMITTED', 'RECRUITER_RESPONSE', 'RECRUITER_CALL',
  'TECHNICAL_SCREEN', 'TECHNICAL_PASS', 'FINAL_ROUND',
  'OFFER', 'REJECTED', 'INACTIVE'
];

const EditApplicationModal = ({ app, onClose }) => {
  const { companies, contacts, resumeVariants, updateApplication, updateJobListing, transitionStage } = useAppContext();

  const [appData, setAppData] = useState({
    dateSubmitted: app.dateSubmitted ?? '',
    sourceChannel: app.sourceChannel ?? 'COLD',
    referred: app.referred ?? false,
    contactId: app.contact?.id ?? '',
    resumeVariantId: app.resumeVariant?.id ?? '',
    notes: app.notes ?? '',
    alignmentNotes: app.alignmentNotes ?? ''
  });

  const [jobData, setJobData] = useState({
    companyId: app.jobListing?.company?.id ?? '',
    title: app.jobListing?.title ?? '',
    roleType: app.jobListing?.roleType ?? 'OTHER',
    url: app.jobListing?.url ?? '',
    snapshotText: app.jobListing?.snapshotText ?? ''
  });

  const [saving, setSaving] = useState(false);
  const [stageNote, setStageNote] = useState('');
  const [stageDate, setStageDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedStage, setSelectedStage] = useState(app.currentStage ?? 'SUBMITTED');
  const [transitioning, setTransitioning] = useState(false);

  const handleAppChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        updateApplication(app.id, {
          notes: appData.notes,
          alignmentNotes: appData.alignmentNotes,
          referred: appData.referred,
          sourceChannel: appData.sourceChannel,
          resumeVariantId: appData.resumeVariantId ? parseInt(appData.resumeVariantId) : null,
          contactId: appData.contactId ? parseInt(appData.contactId) : null,
          dateSubmitted: appData.dateSubmitted || null
        }),
        updateJobListing(app.jobListing.id, {
          companyId: jobData.companyId ? parseInt(jobData.companyId) : null,
          title: jobData.title,
          roleType: jobData.roleType,
          url: jobData.url || null,
          snapshotText: jobData.snapshotText || null
        })
      ]);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleStageTransition = async (stage) => {
    setTransitioning(true);
    try {
      await transitionStage(app.id, stage, stageNote, stageDate);
      onClose();
    } finally {
      setTransitioning(false);
    }
  };

  const nextStages = NEXT_STAGES[app.currentStage] ?? [];
  const currentStageLabel = STAGE_LABELS[app.currentStage] ?? app.currentStage;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Edit Application</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
              Current stage: <span style={{ color: '#38bdf8', fontWeight: 600 }}>{currentStageLabel}</span>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          {/* Job listing fields */}
          <div className="field-row">
            <label>Company</label>
            <select name="companyId" value={jobData.companyId} onChange={handleJobChange}>
              <option value="">— Select —</option>
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="field-row">
            <label>Role Title</label>
            <input
              type="text"
              name="title"
              value={jobData.title}
              onChange={handleJobChange}
              placeholder="Software Engineer"
            />
          </div>

          <div className="field-row-inline">
            <div className="field-row">
              <label>Role Type</label>
              <select name="roleType" value={jobData.roleType} onChange={handleJobChange}>
                {Object.entries(ROLE_TYPE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <label>Source Channel</label>
              <select name="sourceChannel" value={appData.sourceChannel} onChange={handleAppChange}>
                {Object.entries(SOURCE_CHANNEL_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <label>Listing URL</label>
            <input
              type="text"
              name="url"
              value={jobData.url}
              onChange={handleJobChange}
              placeholder="https://..."
            />
          </div>

          <div className="field-row">
            <label>
              Job Description
              {app.jobListing?.snapshotDate && (
                <span className="snapshot-date-label">
                  captured {new Date(app.jobListing.snapshotDate).toLocaleDateString()}
                </span>
              )}
            </label>
            <textarea
              name="snapshotText"
              value={jobData.snapshotText}
              onChange={handleJobChange}
              placeholder="Paste job description here, or use the bookmarklet on the listing page to auto-capture"
              rows={6}
            />
          </div>

          {/* Application fields */}
          <div className="field-row-inline">
            <div className="field-row">
              <label>Date Applied</label>
              <input
                type="date"
                name="dateSubmitted"
                value={appData.dateSubmitted}
                onChange={handleAppChange}
              />
            </div>
            <div className="field-row" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px', paddingTop: '18px' }}>
              <input
                type="checkbox"
                id="edit-referred"
                name="referred"
                checked={appData.referred}
                onChange={handleAppChange}
                style={{ width: 'auto', margin: 0 }}
              />
              <label htmlFor="edit-referred" style={{ marginBottom: 0 }}>Referred</label>
            </div>
          </div>

          <div className="field-row-inline">
            <div className="field-row">
              <label>Contact</label>
              <select name="contactId" value={appData.contactId} onChange={handleAppChange}>
                <option value="">None</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <label>Resume Variant</label>
              <select name="resumeVariantId" value={appData.resumeVariantId} onChange={handleAppChange}>
                <option value="">— Select —</option>
                {resumeVariants.map(r => (
                  <option key={r.id} value={r.id}>{r.versionLabel}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <label>Notes</label>
            <textarea
              name="notes"
              value={appData.notes}
              onChange={handleAppChange}
              placeholder="Application notes"
            />
          </div>

          <div className="field-row">
            <label>Alignment Notes</label>
            <textarea
              name="alignmentNotes"
              value={appData.alignmentNotes}
              onChange={handleAppChange}
              placeholder="Role / company alignment notes"
            />
          </div>

          {/* Stage management */}
          <div className="modal-stage-section">
            <div className="modal-stage-label">Stage</div>
            <div className="expand-inputs" style={{ marginBottom: '10px' }}>
              <input
                className="expand-note"
                type="text"
                placeholder="Stage note (optional)"
                value={stageNote}
                onChange={(e) => setStageNote(e.target.value)}
              />
              <input
                className="expand-date"
                type="date"
                value={stageDate}
                onChange={(e) => setStageDate(e.target.value)}
              />
            </div>
            <div className="expand-stage-btns">
              {nextStages.map(s => (
                <button
                  key={s}
                  className="stage-advance-btn"
                  disabled={transitioning}
                  onClick={() => handleStageTransition(s)}
                >
                  {transitioning ? '...' : `→ ${STAGE_LABELS[s] ?? s}`}
                </button>
              ))}
              <button
                className="stage-advance-btn reject"
                disabled={transitioning}
                onClick={() => handleStageTransition('REJECTED')}
              >
                {transitioning ? '...' : '✕ Rejected'}
              </button>
              <button
                className="stage-advance-btn inactive"
                disabled={transitioning}
                onClick={() => handleStageTransition('INACTIVE')}
              >
                {transitioning ? '...' : '— Inactive'}
              </button>
            </div>
            <div className="stage-override-row">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="stage-override-select"
              >
                {ALL_STAGES.map(s => (
                  <option key={s} value={s}>{STAGE_LABELS[s] ?? s}</option>
                ))}
              </select>
              <button
                className="stage-advance-btn"
                disabled={transitioning || selectedStage === app.currentStage}
                onClick={() => handleStageTransition(selectedStage)}
              >
                {transitioning ? '...' : 'Set Stage'}
              </button>
            </div>
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

export default EditApplicationModal;
