import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import CreatePost from './CreatePost';
import PostItem from './PostItem';

function ProfilePage() {
    // States for loading profiles and posts
    const [profile, setProfile] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    // Function for fetching profile info
    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token.');
            return;
        }

        try {
            // Get profile (for user_id)
            const profileRes = await fetch('api/userController.php', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body: JSON.stringify({ action: 'profile' })
            });

            const profileData = await profileRes.json();

            if (profileRes.ok) {
                setProfile(profileData.data);
            } else {
                console.error(data.message);
                return;
            }

            // Get user's posts
            const postRes = await fetch('api/postController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'getUserPost', user_id: profileData.data.user_id })
            });

            const postData = await postRes.json();
            if (postRes.ok) {
                setPosts(postData.data);
            } else {
                console.error('Error al obtener posts: ', postData.message);
            }
        } catch (error) {
            console.error('Hubo un error al cargar el perfil: ', error);
        }
    };
    fetchProfile();
    }, []);

    //Function for opening 'create post' modal
    //States for showing modal
    const [showModal, setShowModal] = useState(false);


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
                    {posts.length === 0 ? (
                        <p>Este usuario aún no ha publicado nada.</p>
                    ) : (
                        <div className="post-list">
                        {posts.map((post) => (
                            <PostItem key={post.post_id} post={post} />
                        ))}
                        </div>
                    )}
                    <div className='btn-createpost' onClick={() => setShowModal(true)}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5M9 3v4a1 1 0 0 1-1 1H4m11.383.772 2.745 2.746m1.215-3.906a2.089 2.089 0 0 1 0 2.953l-6.65 6.646L9 17.95l.739-3.692 6.646-6.646a2.087 2.087 0 0 1 2.958 0Z"/>
                        </svg>
                    </div>
                    {showModal && (
                        <CreatePost onClose={() => setShowModal(false)}/>
                    )}
                </main>
            </section>
        </div>
    );
}

export default ProfilePage;