import { useEffect, useState } from 'react';


import { Link } from 'react-router-dom';
import { logout } from '../services/auth.service';
import logo from '../assets/img/image (1).png'
export function Home({user, setUser}) {
  

  function onLogout() {
    logout();
    setUser(null);
  }
  return (
    <section className='section'>
      {user ? (
        <div className='home'><h2>Welcome {user.fullname || user.email}</h2> 
        <button className='homelog' onClick={onLogout}>Logout</button> 
        </div>
      ) : (
        <div className='home'>
          <h1>
          Learn More About Common Beetles 
          </h1>
          
          <Link to="/login">
            <button className='homelog'>Login</button>
          </Link>
          <Link to="/signup">
            <button className='homelog'>Signup</button>
          </Link>
        </div>
      )}
      <img alt="Billbugs"
          src={logo} />
          <img alt="Billbugs"
          src={logo} />
          <img alt="Billbugs"
          src={logo} />
    </section>
  );
}
