
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Login } from './cmps/Login.jsx'
import { Signup } from './cmps/Signup.jsx'
import { useEffect, useState } from 'react'

export function App() {
      const [user,setUser] = useState(null)

      useEffect(() => {
        const token = localStorage.getItem('acessToken');
        if (!token) return;
    
        const userData = decodeToken(token)
        setUser(userData)
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
            <AppHeader />
            <main className='container'>
                <Routes>
                    <Route path='/' element={<Home user={user} setUser={setUser} />} />
                    <Route path='/bug' element={<BugIndex />} />
                    <Route path='/bug/:bugId' element={<BugDetails />} />
                    <Route path='/about' element={<AboutUs />} />
                    <Route path='/login' element={<Login setUser={setUser} />} />
                    <Route path='/signup' element={<Signup setUser={setUser} />} />
                </Routes>
            </main>
            <AppFooter />
        </Router>
    )
}
