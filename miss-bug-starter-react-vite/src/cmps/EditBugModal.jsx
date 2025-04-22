import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';



export default function EditBugModal({ isOpen, onClose, onSubmit,bug}) {
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
    <div className="ModalOverEdit"  onClick={handleOverlayClick}>
      <div className="modalConttent" ref={contentRef} onClick={hanldeContentClick}>
        <h2>Edit New Bug</h2>
        <form className="ModalForm" onSubmit={handleSubmit}>
          <input className='modalInput' name="title" defaultValue={bug?.title} required />
          <input  className='modalInput' name="severity" type="number" min="1" max="5" defaultValue={bug?.severity} required />
          <textarea className='modalTextArea' name="description" defaultValue={bug?.description} required />
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

EditBugModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    bug:    PropTypes.shape({
      _id:         PropTypes.string.isRequired,
      title:       PropTypes.string,
      severity:    PropTypes.number,
      description: PropTypes.string,
    }),
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };