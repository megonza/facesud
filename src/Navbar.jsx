function Navbar() {
    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="img/logo-temp-image.png" alt="Logo de la red social" />
                </div>
                <div className="navbar-options">
                    <button className="btn-login">Iniciar sesión</button>
                    <button className="btn-register">Registrarme</button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;