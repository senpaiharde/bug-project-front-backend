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
}