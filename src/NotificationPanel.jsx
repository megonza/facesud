import { useEffect, useRef } from 'react';
import '../public/css/modals-style.css';

function NotificationPanel({ onClose }) {
    const panelRef = useRef(null);

    useEffect(() => {
        //Function for closing modal when clicking outside
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
        <div className="notification-panel" ref={panelRef}>
            <h4>Notificaciones</h4>
            <div className="notification-filters">
                <span>Todos</span>
                <span>Me gusta</span>
                <span>Comentarios</span>
                <span>Solicitudes</span>
            </div>
            <ul>
                <li>1 comentario nuevo</li>
                <li>1 nueva solicitud de amistad</li>
                <li>3 nuevos Me Gusta</li>
            </ul>
        </div>
    );
}

export default NotificationPanel;