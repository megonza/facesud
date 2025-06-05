import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProfilePage from './ProfilePage';
import Auth from './Auth';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>   
  </BrowserRouter>
);