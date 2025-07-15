import '../public/css/post-style.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import Hotbar from './Hotbar';
import PostItem from './PostItem';

const PostPage = () => {
    // States for fetching post
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Function for fetching post
        const token = localStorage.getItem('token');
        const fetchPost = async () => {
            try {
                const response = await fetch('/api/postController.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ action: 'get_post', post_id: postId })
                });

                const data = await response.json();
                if (response.ok) {
                    setPost(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error al cargar el post: ", error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) return <p>Cargando publicación...</p>;

    return (
        <div>
            <Navbar />
            <div className="postpage-container">
                <Hotbar />
                <section className="section-post">
                    <div className="post-container">
                        <PostItem post={post}/>
                    </div>
                    <div className="post-comments">
                        <div className="comments-header">
                            <h2>Comentarios</h2>
                        </div>
                        <div className="comments-content">
                            <div className="comment-item"></div>
                        </div>
                    </div>
                </section>
                <aside className="aside-related">
                    <div className='related-header'>
                        <h2>Te puede interesar...</h2>
                    </div>
                    <div className='related-content'>
                        <div className='related-item'></div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PostPage;