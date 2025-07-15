import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import Auth from './Auth';
import Home from './Home';
import PostPage from './PostPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/:userId" element={<ProfilePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />}/>
      <Route path="/post/:postId" element={<PostPage />}/>
    </Routes>   
  </BrowserRouter>
);