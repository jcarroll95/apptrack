import React from 'react';

const AppHeader = ({ onOpenModal }) => {
  return (
    <header>
      <h1>APPTRACK</h1>
      <div className="header-actions">
        <button className="add-btn" onClick={() => onOpenModal('resume')}>+ Resume</button>
        <button className="add-btn" onClick={() => onOpenModal('contact')}>+ Contact</button>
        <button className="add-btn" onClick={() => onOpenModal('company')}>+ Company</button>
        <button className="add-btn primary" onClick={() => onOpenModal('application')}>+ Application</button>
      </div>
    </header>
  );
};

export default AppHeader;
