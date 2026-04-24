import React from 'react';
import { useAppContext } from '../context/AppContext';

const ToastContainer = () => {
  const { toasts } = useAppContext();

  return (
    <div id="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
