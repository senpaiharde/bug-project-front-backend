import { AppHeader } from './cmps/AppHeader.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';
import { Home } from './pages/Home.jsx';
import { BugIndex } from './pages/BugIndex.jsx';
import { BugDetails } from './pages/BugDetails.jsx';
import { AboutUs } from './pages/AboutUs.jsx';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Login } from './cmps/Login.jsx';
import { Signup } from './cmps/Signup.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { logout } from './services/auth.service.js';

export function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios.defaults.baseURL = 'http://localhost:3030/api';
    axios.defaults.withCredentials = true;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

    const userData = decodeToken(token);

    if (!userData || !userData.exp) {
      console.warn('Invalid or expired token');
      logout();
      return;
    }

    if (userData.exp * 1000 < Date.now()) {
      console.warn('Token expired');
      logout();
      return;
    }

    setUser(userData);

    console.log(' Decoded user from token:', userData);
    setUser(userData);
  }, []);

  function decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (err) {
      return null;
    }
  }
  return (
    <Router>
      <AppHeader user={user} setUser={setUser} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/bug" element={<BugIndex />} />
          <Route path="/bug/:bugId" element={<BugDetails user={user} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </main>
      <AppFooter />
    </Router>
  );
}
