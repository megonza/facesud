import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import NotificationPanel from './NotificationPanel';
import AccountPanel from './AccountPanel';

const Navbar = () => {
    //State for showing panels
    const [showNotifPanel, setShowNotifPanel] = useState(false);
    const [showAccPanel, setShowAccPanel] = useState(false);
    const bellRef = useRef(null);
    const accRef = useRef(null);

    //State for checking token and changing navbar (user or guest)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Get current location (for changing button styles)
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // True if there's token, false if not
    }, []);

    //Function for handling logout
    const handleLogout = ()=> {
        localStorage.removeItem('token');
        window.location.href = '/auth';
    };

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="/img/logo-temp-image.png" alt="Logo de la red social" />
                </div>
                {!isLoggedIn ? (
                    <div className="navbar-options">
                        <button className="btn-login">Iniciar sesión</button>
                        <button className="btn-register">Registrarme</button>
                    </div>
                ) : (
                <>
                    <div className="navbar-navigation">
                        <a href="/home" id='home-button' className={location.pathname === '/home' ? "active" : ""}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/>
                            </svg>
                        </a>
                        <a href="" id='friends-button' className={location.pathname === '/friends' ? "active" : ""}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </a>
                        <a href="" id='groups-button' className={location.pathname === '/groups' ? "active" : ""}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                            </svg>
                        </a>
                        <a href="" id='events-button' className={location.pathname === '/events' ? "active" : ""}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                        </svg>
                        </a>
                    </div>
                    <div className="navbar-account">
                        <div className='notification-container' ref={bellRef}>
                            <span className="account-item" onClick={() => setShowNotifPanel(prev => !prev)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"/>
                                </svg>
                                {showNotifPanel && <NotificationPanel onClose={() => setShowNotifPanel(false)} />}
                            </span>
                        </div>
                        <div className='messages-container'>
                            <span className="account-item">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
                                </svg>
                            </span>
                        </div>
                        <div className='profile-container' ref={accRef}>
                            <span className="account-item" onClick={() => setShowAccPanel(prev => !prev)}>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                                {showAccPanel && <AccountPanel
                                     onClose={() => setShowAccPanel(false)}
                                     onLogout={(handleLogout)}
                                />}
                            </span>
                        </div>
                    </div>
                </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;