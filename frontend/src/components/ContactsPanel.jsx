import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import EditContactModal from './EditContactModal';

const ContactsPanel = () => {
  const { contacts, softDeleteContact, restoreContact } = useAppContext();
  const [editingContact, setEditingContact] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false);

  const byName = (a, b) => (a.name ?? '').localeCompare(b.name ?? '');

  const active  = [...contacts].filter(c => !c.deleted).sort(byName);
  const deleted = [...contacts].filter(c =>  c.deleted).sort(byName);

  return (
    <div className="panel">
      <div className="panel-title">Contacts</div>

      {active.length === 0 ? (
        <div className="empty-state">No contacts</div>
      ) : (
        <>
          <div className="contact-header">
            <span>Name</span>
            <span>Company</span>
            <span>Email</span>
            <span>Phone</span>
            <span />
          </div>
          {active.map(c => (
            <div key={c.id} className="contact-row">
              <div className="contact-name">{c.name}</div>
              <div className="contact-secondary">{c.company ?? '—'}</div>
              <div className="contact-secondary">{c.email ?? '—'}</div>
              <div className="contact-secondary">{c.phone ?? '—'}</div>
              <div className="row-actions">
                <button className="edit-app-btn" onClick={() => setEditingContact(c)}>✎</button>
                <button className="delete-row-btn" onClick={() => softDeleteContact(c.id)}>🗑</button>
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
              {deleted.map(c => (
                <div key={c.id} className="recover-row">
                  <span className="recover-label">{c.name}{c.company ? ` — ${c.company}` : ''}</span>
                  <button className="restore-btn" onClick={() => restoreContact(c.id)}>Restore</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {editingContact && (
        <EditContactModal contact={editingContact} onClose={() => setEditingContact(null)} />
      )}
    </div>
  );
};

export default ContactsPanel;
