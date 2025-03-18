// Modal.js
import React from 'react';
import './Modal.css';  // You can customize the styles

const Modal = ({ isOpen, onClose, userDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Thank You, {userDetails.name}!</h2>
        <span>Your booking is confirmed!</span>
        <div className='modal-details'>
          <p><strong>Artist:</strong> {userDetails.artist}</p>
          <p><strong>Service:</strong> {userDetails.service}</p>
          <p><strong>Date:</strong> {userDetails.date}</p>
          <p><strong>Time:</strong> {userDetails.time}</p>
        </div>
        <button className="close-button" onClick={onClose}>Continue Browsing</button>
      </div>
    </div>
  );
};

export default Modal;
