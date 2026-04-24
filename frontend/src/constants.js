export const DISPLAY_STAGES = [
  'RECRUITER_RESPONSE', 'RECRUITER_CALL',
  'TECHNICAL_SCREEN', 'TECHNICAL_PASS',
  'FINAL_ROUND', 'OFFER'
];

export const TERMINAL = ['OFFER', 'REJECTED', 'INACTIVE'];

export const STAGE_LABELS = {
  SUBMITTED: 'Applied',
  RECRUITER_RESPONSE: 'Recruiter',
  RECRUITER_CALL: 'Screen',
  TECHNICAL_SCREEN: 'Tech Screen',
  TECHNICAL_PASS: 'Tech Pass',
  FINAL_ROUND: 'Final',
  OFFER: 'Offer',
  REJECTED: 'Rejected',
  INACTIVE: 'Inactive'
};

export const STAGE_DATE_FIELD = {
  RECRUITER_RESPONSE: 'dateRecruiterResponse',
  RECRUITER_CALL:     'dateRecruiterCall',
  TECHNICAL_SCREEN:   'dateTechnicalScreen',
  TECHNICAL_PASS:     'dateTechnicalPass',
  FINAL_ROUND:        'dateFinalRound',
  OFFER:              'dateOffer'
};

export const NEXT_STAGES = {
  SUBMITTED:          ['RECRUITER_RESPONSE'],
  RECRUITER_RESPONSE: ['RECRUITER_CALL'],
  RECRUITER_CALL:     ['TECHNICAL_SCREEN'],
  TECHNICAL_SCREEN:   ['TECHNICAL_PASS'],
  TECHNICAL_PASS:     ['FINAL_ROUND'],
  FINAL_ROUND:        ['OFFER']
};
