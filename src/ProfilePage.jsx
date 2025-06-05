function ProfilePage() {
    return(
        <div>
            <section className="section-banner">
                <div className="banner-container">
                    <div className="banner-image">
                        La imagen va aca adentro
                    </div>
                    <div className="banner-pfp">
                        La foto de perfil va aca adentro
                    </div>
                    <h2>Nombre de la persona</h2>
                    <div className="division-line"></div>
                    <ul className="banner-tabs">
                        <li>Información</li>
                        <li>Publicaciones</li>
                        <li>Amigos</li>
                    </ul>
                </div>
            </section>
            <section className="section-body">
                <aside className="cards-container">
                    <div className="card-item">
                        <h3>Información</h3>
                        <p>Esta tarjeta incluye la descripción configurada por el usuario. Tiene un límite
                            de caracteres y puede ser cambiado en cualquier momento. 
                        </p>
                    </div>
                    <div className="card-item">
                        <h3>Informacion de miembro</h3>
                        <p>Esta tarjeta muestra varios datos configurados por el usuario respecto a su
                            status de miembro, incluyendo sus mandamientos.
                        </p>
                    </div>
                    <div className="card-item">
                        <h3>Próximos eventos donde asistirá</h3>
                        <p>Acá se muestran de forma dinámica los eventos a los cuales el
                            usuario se ha inscrito, marcándolos como asistencias futuras.
                        </p>
                    </div>
                </aside>
                <main className="posts-container">
                    <div className="post-item">
                        <p>Este item es un post, puede incluir texto, imágenes, videos, etc.</p>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default ProfilePage;