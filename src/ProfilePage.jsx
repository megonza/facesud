function ProfilePage() {
    return(
        <div>
            <section className="section-banner">
                <div className="banner-container">
                    <div className="banner-image">
                        <img src="null" alt="banner image" />
                    </div>
                    <div className="banner-pfp">
                        <img src="null" alt="pfp image" />
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
                        <span>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v4.997a.31.31 0 0 1-.068.113c-.08.098-.213.207-.378.301-.947.543-1.713 1.54-2.191 2.488A6.237 6.237 0 0 0 4.82 14.4c-.1.48-.138 1.031.018 1.539C5.12 16.846 6.02 17 6.414 17H11v3a1 1 0 1 0 2 0v-3h4.586c.395 0 1.295-.154 1.575-1.061.156-.508.118-1.059.017-1.539a6.241 6.241 0 0 0-.541-1.5c-.479-.95-1.244-1.946-2.191-2.489a1.393 1.393 0 0 1-.378-.301.309.309 0 0 1-.068-.113V5h1a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2h1Z"/>
                            </svg>
                            Esto es un evento dentro de la lista de futuros eventos.    
                        </span>
                        <span>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v4.997a.31.31 0 0 1-.068.113c-.08.098-.213.207-.378.301-.947.543-1.713 1.54-2.191 2.488A6.237 6.237 0 0 0 4.82 14.4c-.1.48-.138 1.031.018 1.539C5.12 16.846 6.02 17 6.414 17H11v3a1 1 0 1 0 2 0v-3h4.586c.395 0 1.295-.154 1.575-1.061.156-.508.118-1.059.017-1.539a6.241 6.241 0 0 0-.541-1.5c-.479-.95-1.244-1.946-2.191-2.489a1.393 1.393 0 0 1-.378-.301.309.309 0 0 1-.068-.113V5h1a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2h1Z"/>
                            </svg>
                            Cada span de esta tarjeta representa un evento distinto
                        </span>
                        <span>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v4.997a.31.31 0 0 1-.068.113c-.08.098-.213.207-.378.301-.947.543-1.713 1.54-2.191 2.488A6.237 6.237 0 0 0 4.82 14.4c-.1.48-.138 1.031.018 1.539C5.12 16.846 6.02 17 6.414 17H11v3a1 1 0 1 0 2 0v-3h4.586c.395 0 1.295-.154 1.575-1.061.156-.508.118-1.059.017-1.539a6.241 6.241 0 0 0-.541-1.5c-.479-.95-1.244-1.946-2.191-2.489a1.393 1.393 0 0 1-.378-.301.309.309 0 0 1-.068-.113V5h1a1 1 0 1 0 0-2H7a1 1 0 1 0 0 2h1Z"/>
                            </svg>
                            Una banda de eventos
                        </span>
                    </div>
                </aside>
                <main className="posts-container">
                    <div className="post-item">
                        <p>Este item es un post, puede incluir texto, imágenes, videos, etc.</p>
                    </div>
                    <div className="post-item">
                        <p>Este item es un post, puede incluir texto, imágenes, videos, etc.</p>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default ProfilePage;