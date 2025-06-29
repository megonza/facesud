import { useState, useEffect } from 'react';
import Navbar from './Navbar';

function ProfilePage() {
    // States for loading profiles
    const [profile, setProfile] = useState('');

    useEffect(() => {
    // Function for fetching profile info
    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token.');
            return;
        }

        try {
            const response = await fetch('api/userController.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ action: 'profile' })
            });

            const text = await response.text();
            console.log("Texto recibido:", text);
            const data = JSON.parse(text);

            if (response.ok) {
                setProfile(data.data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Hubo un error al cargar el perfil: ', error);
        }
    };
    fetchProfile();
    }, []);

    // HTML Return
    return(
        <div>
            <Navbar />
            <section className="section-banner">
                <div className="banner-container">
                    <div className="banner-image">
                        <img src="/img/default-background-image.png" alt="banner image" />
                        <div className="banner-pfp">
                            <img src="/img/default-profile-image.jpg" alt="pfp image" />
                        </div>
                    </div>
                    <h2>{profile.name}</h2>
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
                        <h3>Sobre mí</h3>
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
                        <span className="post-user">
                            <img src="img/default-profile-image.jpg" alt="" />
                            <h4>{profile.name}</h4>
                            <p>hace cuánto tiempo</p>
                        </span>
                        <p>Este item es un post, puede incluir texto, imágenes, videos, etc.</p>
                        <div className="post-interact">
                            <span className="interact-like">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                </svg>
                                <p>39</p>
                            </span>
                            <span className="interact-comment">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                </svg>
                                <p>7</p>
                            </span>
                            <span className="interact-share">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                </svg>
                                <p>2</p>
                            </span>
                        </div>
                    </div>
                    <div className="post-item">
                        <span className="post-user">
                            <img src="img/default-profile-image.jpg" alt="" />
                            <h4>{profile.name}</h4>
                            <p>hace cuánto tiempo</p>
                        </span>
                        <p>Este item es un post, puede incluir texto, imágenes, videos, etc.</p>
                        <div className="post-interact">
                            <span className="interact-like">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                </svg>
                                22
                            </span>
                            <span className="interact-comment">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
                                </svg>
                                0
                            </span>
                            <span className="interact-share">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                                </svg>
                                0
                            </span>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default ProfilePage;