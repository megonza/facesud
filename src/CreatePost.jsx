import { useState } from 'react';
import '../public/css/modals-style.css';

function CreatePost({ onClose }) {
    //States for saving textarea content
    const [postText, setPostText] = useState('');

    //Function for handling post submit
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No se encontró el token.");
            return;
        }

        try {
            const response = await fetch('api/postController.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action: 'create_post', text: postText })
            });

            const data = await response.json();
            if (response.ok) {
                alert("Publicación creada con éxito.");
            } else {
                alert(data.error || 'Error al crear la publicación.');
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("Hubo un problema al enviar el post.");
        }
    };

    //HTML Return
    return (
        <div>
            <div className='modal-overlay'>
                <div className="create-post-modal">
                    <div className="create-post-header">
                        <h2>Crear publicación</h2>
                        <span onClick={onClose}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </span>
                    </div>
                    <div className="division-line"></div>
                    <div className="create-post-content">
                        <div className="create-post-userinfo">
                            <img src="../public/img/default-profile-image.jpg" alt="" />
                        </div>
                        <textarea value={postText} onChange={(e) => setPostText(e.target.value)} placeholder="Comparte un pensamiento, testimonio, etc..."></textarea>
                    </div>
                    <div className="create-post-options">
                        <p>Adjuntar a la publicación: </p>
                        <span>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z"/>
                                <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </span>
                        <span>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                        </span>
                    </div>
                    <div className="create-post-publish">
                        <button onClick={handleSubmit}>Publicar</button>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default CreatePost;