import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

export default function AddBugModal({ isOpen, onClose, onSubmit }) {
  const contentRef = useRef();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.addEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick() {
    onClose();
  }

  function hanldeContentClick(e) {
    e.stopPropagation();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fm = new FormData(e.target);
    onSubmit({
      title: fm.get('title'),
      severity: +fm.get('severity'),
      description: fm.get('description'),
    });
  }

  return (
    <div className="ModalOverlay" onClick={handleOverlayClick}>
      <div className="modalConttent" ref={contentRef} onClick={hanldeContentClick}>
        <h2>Add New Bug</h2>
        <form className="ModalForm" onSubmit={handleSubmit}>
          <input className='modalInput' name="title" placeholder="Title" required />
          <input  className='modalInput' name="severity" type="number" min="1" max="5" placeholder="Severity" required />
          <textarea className='modalTextArea' name="description" placeholder="Description" required />
          <div className="modalActions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddBugModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
