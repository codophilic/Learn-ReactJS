import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      {children}
    </div>,
    document.getElementById('appComponent')
  );
}

export default Modal;
