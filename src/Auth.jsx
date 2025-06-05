import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Auth = () => {
    //State for currently active tab
    const [activeTab, setActiveTab] = useState('Login');

    const renderContent = () => {
        switch(activeTab) {
            case 'Login':
                return <Login />;
            case 'Register':
                return <Register />;
        }
    };

    //HTML Return
    return (
        <div>
            <div className="auth-tabs">
                <span onClick={() => setActiveTab('Login')}>Iniciar Sesión</span>
                <span onClick={() => setActiveTab('Register')}>Registrarse</span>
            </div>
            <main className="auth-content">{renderContent()}</main>
        </div>
    );
}

export default Auth;