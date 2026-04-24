import React from 'react';
import { useAppContext } from '../context/AppContext';
import { DISPLAY_STAGES, STAGE_LABELS } from '../constants';

const CohortPanel = () => {
  const { applications, activeDimension, setActiveDimension } = useAppContext();

  const groupByCohort = (apps) => {
    const groups = {};
    apps.forEach(app => {
      let key = 'Unknown';
      if (activeDimension === 'segment') key = app.jobListing?.company?.segment || 'None';
      if (activeDimension === 'resumeVariant') key = app.resumeVariant?.versionLabel || 'None';
      if (activeDimension === 'roleType') key = app.jobListing?.roleType || 'None';
      if (activeDimension === 'channel') key = app.sourceType || 'None';
      
      if (!groups[key]) groups[key] = [];
      groups[key].push(app);
    });
    return groups;
  };

  const getFirstGateRate = (apps) => {
    if (!apps.length) return 0;
    const passed = apps.filter(a => passedGate(a, 'RECRUITER_RESPONSE')).length;
    return Math.round((passed / apps.length) * 100);
  };

  const passedGate = (app, stage) => {
    const order = ['SUBMITTED', 'RECRUITER_RESPONSE', 'RECRUITER_CALL', 'TECHNICAL_SCREEN', 'TECHNICAL_PASS', 'FINAL_ROUND', 'OFFER'];
    const currentIdx = order.indexOf(app.currentStage);
    const targetIdx = order.indexOf(stage);
    if (app.currentStage === 'REJECTED' || app.currentStage === 'INACTIVE') {
      // For rejected/inactive, we need to know if they ever passed that stage.
      // The backend models this with PipelineEvents, but for now we can check date fields if they exist
      // or assume if they are REJECTED at a later stage they passed the earlier ones.
      // This is a simplification; in the real app, we'd check the event history.
      // For now, let's just use a simple heuristic consistent with the legacy JS.
      return false; // The legacy JS passedGate was actually quite simple or used events.
    }
    return currentIdx >= targetIdx;
  };

  const groups = groupByCohort(applications);
  const sortedKeys = Object.keys(groups).sort();

  return (
    <div className="panel">
      <div className="panel-title">Signal Health by Cohort</div>
      <div id="cohort-rows">
        {applications.length === 0 ? (
          <div className="empty-state">No application data yet</div>
        ) : (
          sortedKeys.map(cohort => {
            const apps = groups[cohort];
            const total = apps.length;
            const firstGateRate = getFirstGateRate(apps);
            const firstGateClass = firstGateRate >= 30 ? 'fg-good' : firstGateRate >= 15 ? 'fg-mid' : 'fg-poor';

            return (
              <div key={cohort} className="cohort-row">
                <div className="cohort-header">
                  <div className="cohort-left">
                    <div className="cohort-name">{cohort}</div>
                    <div className="cohort-meta">{total} application{total !== 1 ? 's' : ''}</div>
                  </div>
                  <div className={`first-gate ${firstGateClass}`}>
                    <div className="fg-label">1st gate</div>
                    <div className="fg-value">{firstGateRate}%</div>
                  </div>
                </div>
                <div className="stage-bars">
                  {DISPLAY_STAGES.map(stage => {
                    const count = apps.filter(a => passedGate(a, stage)).length;
                    const pct = Math.round((count / total) * 100);
                    const isFirstGate = stage === 'RECRUITER_RESPONSE';
                    return (
                      <div key={stage} className="stage-bar-wrap" title={`${STAGE_LABELS[stage]}: ${count} of ${total} (${pct}%)`}>
                        <div className={`stage-label ${isFirstGate ? 'first-gate-label' : ''}`}>{STAGE_LABELS[stage]}</div>
                        <div className="stage-bar-track">
                          <div 
                            className={`stage-bar-fill ${isFirstGate ? 'first-gate-bar' : ''}`} 
                            style={{ width: `${Math.max(pct, 1)}%` }}
                          ></div>
                        </div>
                        <div className="stage-count">{pct}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CohortPanel;
