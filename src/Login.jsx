import React, { useState } from 'react';

const Login = () => {
    //States for user inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Function for handling data submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('api/userController.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login', email, password })
            });

            const text = await response.text();
            if (!text) throw new Error('Respuesta vacía del servidor.');
            const data = JSON.parse(text);
            console.log("Datos recibidos:", data);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Inicio de sesión exitoso.');
                window.location.href = '/profile';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="auth-label" htmlFor="email">Correo electrónico</label>
            <input className="auth-input"
                name="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <label className="auth-label" htmlFor="password">Contraseña</label>
            <input className="auth-input"
                name="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;