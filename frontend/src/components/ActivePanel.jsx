import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TERMINAL, STAGE_LABELS, NEXT_STAGES } from '../constants';

const ActivePanel = () => {
  const { applications, transitionStage } = useAppContext();
  const [expandedAppId, setExpandedAppId] = useState(null);
  
  // Local state for expanded row inputs and processing
  const [transitioningId, setTransitioningId] = useState(null);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const activeApps = applications
    .filter(app => app.active && !TERMINAL.includes(app.currentStage))
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

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="panel">
      <div className="panel-title">Active Applications</div>
      <div id="active-rows">
        {activeApps.length === 0 ? (
          <div className="empty-state">No active applications</div>
        ) : (
          <>
            <div className="app-header">
              <span>Company</span><span>Role</span><span>Stage</span><span>Age</span>
            </div>
            {activeApps.map(app => {
              const company = app.jobListing?.company?.name ?? 'Unknown';
              const role = app.jobListing?.title ?? 'Unknown Role';
              const stage = STAGE_LABELS[app.currentStage] ?? app.currentStage;
              const submitted = app.dateSubmitted ? new Date(app.dateSubmitted) : null;
              const today = new Date();
              const daysAgo = submitted ? Math.floor((today - submitted) / 86400000) : null;
              const ageClass = daysAgo === null ? '' : daysAgo > 21 ? 'age-red' : daysAgo > 10 ? 'age-yellow' : 'age-green';
              const isExpanded = expandedAppId === app.id;
              const nextStages = NEXT_STAGES[app.currentStage] ?? [];

              return (
                <React.Fragment key={app.id}>
                  <div className="app-row" onClick={() => toggleExpand(app.id)}>
                    <div className="app-company">{company}</div>
                    <div className="app-role">{role}</div>
                    <div className="app-stage">{stage}</div>
                    <div className={`app-age ${ageClass}`}>{daysAgo !== null ? daysAgo + 'd' : '—'}</div>
                  </div>
                  <div className={`app-expand ${isExpanded ? 'open' : ''}`}>
                    <div className="expand-current-stage">Current stage: <span>{stage}</span></div>
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
                      {nextStages.map(s => {
                        const isTransitioning = transitioningId === app.id;
                        return (
                          <button 
                            key={s} 
                            className="stage-advance-btn" 
                            disabled={isTransitioning}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTransition(app.id, s);
                            }}
                          >
                            {isTransitioning ? '...' : `→ ${STAGE_LABELS[s] ?? s}`}
                          </button>
                        );
                      })}
                      <button 
                        className="stage-advance-btn reject" 
                        disabled={transitioningId === app.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTransition(app.id, 'REJECTED');
                        }}
                      >
                        {transitioningId === app.id ? '...' : '✕ Rejected'}
                      </button>
                      <button 
                        className="stage-advance-btn inactive" 
                        disabled={transitioningId === app.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTransition(app.id, 'INACTIVE');
                        }}
                      >
                        {transitioningId === app.id ? '...' : '— Inactive'}
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default ActivePanel;
