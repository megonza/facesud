import React, { useState } from 'react';

const Register = () => {
    //States for user inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [memberNum, setMemberNum] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    //Function for handling data submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch('api/userController.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action: 'register' , name, email, password, confirmPassword, member_num: memberNum })
            });


            const text = await response.text(); 
            console.log("Respuesta completa: ", text);
            const data = JSON.parse(text); 

            if (response.ok) {
                setSuccess('¡Registrado con éxito! Ya puedes iniciar sesión.');
            } else {
                setError(data.message || 'Ocurrió un error durante el registro.');
            }
        } catch (error) {
            console.error("Error: ", error);
            setError('Ocurrió un error en el servidor.');
        }
    };

    //HTML Return
    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <label className="auth-label" htmlFor="nombre">Nombre</label>
                <input className="auth-input"
                type="text" 
                name="nombre" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
                />
                <label className="auth-label" htmlFor="email">Correo electrónico</label>
                <input className="auth-input"
                type="email" 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                />
                <label className="auth-label" htmlFor="password">Contraseña</label>
                <input className="auth-input"
                type="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                />
                <label className="auth-label" htmlFor="confirmpassword">Confirmar contraseña</label>
                <input className="auth-input"
                type="password" 
                name="confirmpassword" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                />
                <label className="auth-label" htmlFor="number">Número de miembro</label>
                <input className="auth-input"
                type="number" 
                name="number" 
                value={memberNum} 
                onChange={(e) => setMemberNum(e.target.value)} 
                required 
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;