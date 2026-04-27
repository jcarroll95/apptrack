import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TERMINAL, STAGE_LABELS, NEXT_STAGES } from '../constants';
import EditApplicationModal from './EditApplicationModal';

const STAGE_COLOR = {
  OFFER:    '#22c55e',
  REJECTED: '#ef4444',
  INACTIVE: '#64748b',
};

const ActivePanel = () => {
  const { applications, transitionStage } = useAppContext();
  const [expandedAppId, setExpandedAppId] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [transitioningId, setTransitioningId] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const activeApps = applications
    .filter(app => app.active && !TERMINAL.includes(app.currentStage))
    .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));

  const closedApps = applications
    .filter(app => !app.active || TERMINAL.includes(app.currentStage))
    .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));

  const toggleExpand = (id) => {
    if (expandedAppId === id) {
      setExpandedAppId(null);
    } else {
      setExpandedAppId(id);
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  };

  const handleTransition = async (id, stage) => {
    setTransitioningId(id);
    try {
      await transitionStage(id, stage, note, date);
      setExpandedAppId(null);
    } finally {
      setTransitioningId(null);
    }
  };

  const renderRow = (app) => {
    const company = app.jobListing?.company?.name ?? 'Unknown';
    const role = app.jobListing?.title ?? 'Unknown Role';
    const stageLabel = STAGE_LABELS[app.currentStage] ?? app.currentStage;
    const stageColor = STAGE_COLOR[app.currentStage] ?? '#38bdf8';
    const submitted = app.dateSubmitted ? new Date(app.dateSubmitted) : null;
    const today = new Date();
    const daysAgo = submitted ? Math.floor((today - submitted) / 86400000) : null;
    const ageClass = daysAgo === null ? '' : daysAgo > 21 ? 'age-red' : daysAgo > 10 ? 'age-yellow' : 'age-green';
    const isExpanded = expandedAppId === app.id;
    const isTransitioning = transitioningId === app.id;
    const nextStages = NEXT_STAGES[app.currentStage] ?? [];
    const isTerminal = TERMINAL.includes(app.currentStage);

    return (
      <React.Fragment key={app.id}>
        <div className="app-row" onClick={() => toggleExpand(app.id)}>
          <div className="app-company">{company}</div>
          <div className="app-role">{role}</div>
          <div className="app-stage" style={{ color: stageColor }}>{stageLabel}</div>
          <div className={`app-age ${ageClass}`}>{daysAgo !== null ? daysAgo + 'd' : '—'}</div>
          <button
            className="edit-app-btn"
            onClick={(e) => { e.stopPropagation(); setEditingApp(app); }}
          >✎</button>
        </div>
        <div className={`app-expand ${isExpanded ? 'open' : ''}`}>
          <div className="expand-current-stage">Current stage: <span style={{ color: stageColor }}>{stageLabel}</span></div>
          <div className="expand-inputs">
            <input
              className="expand-note"
              type="text"
              placeholder="Quick note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <input
              className="expand-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="expand-stage-btns">
            {nextStages.map(s => (
              <button
                key={s}
                className="stage-advance-btn"
                disabled={isTransitioning}
                onClick={(e) => { e.stopPropagation(); handleTransition(app.id, s); }}
              >
                {isTransitioning ? '...' : `→ ${STAGE_LABELS[s] ?? s}`}
              </button>
            ))}
            {!isTerminal && (
              <>
                <button
                  className="stage-advance-btn reject"
                  disabled={isTransitioning}
                  onClick={(e) => { e.stopPropagation(); handleTransition(app.id, 'REJECTED'); }}
                >
                  {isTransitioning ? '...' : '✕ Rejected'}
                </button>
                <button
                  className="stage-advance-btn inactive"
                  disabled={isTransitioning}
                  onClick={(e) => { e.stopPropagation(); handleTransition(app.id, 'INACTIVE'); }}
                >
                  {isTransitioning ? '...' : '— Inactive'}
                </button>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  };

  const columnHeaders = (
    <div className="app-header">
      <span>Company</span><span>Role</span><span>Stage</span><span>Age</span><span />
    </div>
  );

  return (
    <div className="panel">
      <div className="panel-title">Active Applications</div>
      <div id="active-rows">
        {activeApps.length === 0 ? (
          <div className="empty-state">No active applications</div>
        ) : (
          <>
            {columnHeaders}
            {activeApps.map(renderRow)}
          </>
        )}
      </div>

      {closedApps.length > 0 && (
        <>
          <div className="closed-separator">
            <span>Closed</span>
          </div>
          <div id="closed-rows">
            {columnHeaders}
            {closedApps.map(renderRow)}
          </div>
        </>
      )}

      {editingApp && (
        <EditApplicationModal app={editingApp} onClose={() => setEditingApp(null)} />
      )}
    </div>
  );
};

export default ActivePanel;
