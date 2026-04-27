const API = '';

export const api = {
  fetchApplications: () => fetch(`${API}/api/applications`).then(res => res.json()),
  fetchCompanies: () => fetch(`${API}/api/companies`).then(res => res.json()),
  fetchContacts: () => fetch(`${API}/api/contacts`).then(res => res.json()),
  fetchResumeVariants: () => fetch(`${API}/api/resumevariants`).then(res => res.json()),
  
  createCompany: (data) => fetch(`${API}/api/companies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  createJobListing: (data) => fetch(`${API}/api/joblistings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  createApplication: (data) => fetch(`${API}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  createContact: (data) => fetch(`${API}/api/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  createResumeVariant: (data) => fetch(`${API}/api/resumevariants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json()),
  
  updateContact: (id, data) => fetch(`${API}/api/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }),

  updateResumeVariant: (id, data) => fetch(`${API}/api/resumevariants/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }),

  updateJobListing: (id, data) => fetch(`${API}/api/joblistings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }),

  updateApplication: (id, data) => fetch(`${API}/api/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }),

  transitionStage: (id, stage, notes = '', date = '') => fetch(`${API}/api/applications/${id}/stage`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stage, notes, date })
  }).then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }),
};
