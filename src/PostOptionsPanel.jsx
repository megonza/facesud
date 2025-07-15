import '../public/css/modals-style.css';
import { useEffect, useRef } from 'react';

const PostOptionsPanel = ({ onEdit, onDelete, onClose }) => {
    const panelRef = useRef(null);
    
    useEffect(() => {
        // Function for closing modal when clicking anywhere else
        function handleClickOutside(event) {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    // HTML Return
    return (
        <div className='postoptions-container' ref={panelRef}>
            <button onClick={onEdit}>Editar</button>
            <button onClick={onDelete}>Eliminar</button>
        </div>
    );
}

export default PostOptionsPanel;