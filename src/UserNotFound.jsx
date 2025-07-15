import '../public/css/miscpages-style.css';

const UserNotFound = () => {
    return (
        <div className="user-not-found-container">
            <h2>Miembro no encontrado</h2>
            <p>Es posible que la cuenta haya sido eliminada o que la URL sea incorrecta.</p>
            <a href="/home">Volver a FaceSud</a>
        </div>
    );
}

export default UserNotFound;