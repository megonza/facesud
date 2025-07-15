import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Hotbar from './Hotbar';
import PostItem from './PostItem';
import '../public/css/home-style.css';

const Home = () => {
    //State for loading all posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //Function for fetching all posts
        const fetchPosts = async () => {
            //Get token
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token.');
                return;
            }

            try {
                const response = await fetch('api/postController.php', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ action: 'getAllPost' })
                });

                const data = await response.json();
                if (response.ok) {
                    setPosts(data.data);
                } else {
                    console.error('Error al recuperar posts: ', data.message);
                }
            } catch (error) {
                console.error('Error al recuperar posts: ', error);
            }
        };
        fetchPosts();
    }, []);

    // HTML Return
    return (
        <div>
            <Navbar />
            <section className='home-container'>
                <Hotbar />
                <main className='home-feed'>
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <PostItem key={post.post_id} post={post}/>
                        ))
                    ) : (
                        <p>No hay publicaciones.</p>
                    )}
                </main>
            </section>
        </div>
    );
}

export default Home;