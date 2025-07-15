import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostOptionsPanel from './PostOptionsPanel';

const PostItem = ({ post }) => {
    // States for options modal
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div>
            <div className="post-item">
                <span className="post-user">
                    <img src="img/default-profile-image.jpg" alt="" />
                    <Link to={`/profile/${post.user_id}`}>
                        <h4>{post.Author_name}</h4>
                    </Link>
                    <p>{new Date(post.date_posted).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <span onClick={() => setShowOptions(prev => !prev)}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 12h.01m6 0h.01m5.99 0h.01"/>
                        </svg>
                    </span>
                    {showOptions && (
                        <PostOptionsPanel 
                        onEdit={() => console.log("Esto es verdad !!", post.post_id)} 
                        onDelete={() => console.log("Eliminando...ahrr", post.post_id)}
                        onClose={() => setShowOptions(false)}
                        />
                    )}
                </span>
                <Link to={`/post/${post.post_id}`} className="no-underline text-inherit">
                <p>{post.text}</p>
                </Link>
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
                    <span className='interact-save'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                        </svg>
                        <p>16</p>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default PostItem;