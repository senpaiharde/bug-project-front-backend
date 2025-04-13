import { useEffect, useState } from 'react';
import img from '../assets/img/logo.png';

import { Link } from 'react-router-dom';
import { logout } from '../services/auth.service';

export function Home({user, setUser}) {
  

  function onLogout() {
    logout();
    setUser(null);
  }
  return (
    <section>
      {user ? (
        <><h2>Welcome {user.fullname || user.email}</h2> 
        <button onClick={onLogout}>Logout</button> 
        </>
      ) : (
        <>
          <h1>
            Welcome to MissBug <img src={img} alt="bug" />
          </h1>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </>
      )}
    </section>
  );
}
