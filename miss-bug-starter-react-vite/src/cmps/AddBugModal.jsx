import PropTypes from "prop-types";
import { useEffect, useRef } from "react";


export default async function AddBugModal({isOpen,onClose,onSubmit}) {
    const contentRef = useRef()

    useEffect(() => {
        function handleKey(e) {
            if(e.key === 'esc') onClose();
        }
        if(isOpen) document.addEventListener('keydown',handleKey)
            return()=> document.addEventListener('keydown',handleKey) 
    },[isOpen,onClose])



    if(!isOpen) return null;

    function handleOverlayClick() {
        onClose();
    }

    function  hanldeContentClick(e) {
        e.stopPropagation();
    }

    function handleSubmit(e) {
        e.preventDefault();
        const fm = new FormData(e.target);
        onsubmit({
            title:fm.get('Bug title?') || 'Untitled Bug',
            severity:+fm.get('Bug severity?') || 1,
            description: fm.get('Bug description?') || 'No description',

        });
    }

    return(
        <div className="ModalOverlay" onClick={hanldeContentClick}>
            <div className="modalConttent" 
            ref={contentRef} 
            onClick={hanldeContentClick}>
                <h2>Add New Bug</h2>
                <form className="ModalForm" onSubmit={handleSubmit}>
                    <input name="title" placeholder="Title" required/>
                    <input 
                    name="severity" 
                    type="number"
                    min='1'
                    max='5'
                    placeholder="Severity" 
                    required
                    /> 
                    <textarea name="description" placeholder="Description" required/>
                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Save</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )


}

AddBugModal.PropTypes = {
    isOpen : PropTypes.bool.isRequired,
    onClose:  PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}