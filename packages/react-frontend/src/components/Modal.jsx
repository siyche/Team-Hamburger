import { useRef } from "react";
import "../styles/Modal.css"; // Adjust the path if needed

function Modal({ isOpen, onCloseRequested, headerLabel, children }) {
  const modalRef = useRef(null); // Reference to detect clicks inside modal

  if (!isOpen) return null; // Do not render if modal is closed

  // When clicking outside the modal content, close the modal.
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCloseRequested();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div ref={modalRef} className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">{headerLabel}</h2>
          <button
            onClick={onCloseRequested}
            aria-label="Close"
            className="modal-close-btn"
          >
            ✖
          </button>
        </div>
        {/* Modal Body */}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;