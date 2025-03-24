import React from 'react';

import style from './Modal.module.css';

export default function Modal({ children, isOpen, onConfirm, onClose, acceptBtnText, declineBtnText }) {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        {children}
        <button onClick={onClose}>{declineBtnText}</button>
        <button onClick={onConfirm}>{acceptBtnText}</button>
      </div>
    </div>
  );
}


