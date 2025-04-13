import { useEffect } from 'react';
import { UserMsg } from './UserMsg';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../services/auth.service';
export function AppHeader({ user, setUser }) {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, []);

  function onLogout() {
    logout();
    setUser(null);
  }

  return (
    <header className="app-header container">
      <div className="header-container">
        <h1>Bugs Library </h1>
        <div className="UserHeader">
          
          {user ? (
        <><h2>Welcome {user.fullname || user.email}</h2> 
        <button onClick={onLogout}>Logout</button> 
        </>
      ) : (<div> 
                <Link to="/login">
                  <button>Login</button>
                </Link>
                <Link to="/signup">
                  <button>Signup</button>
                </Link></div>)}
          
        </div>

        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> | <NavLink to="/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      <UserMsg />
    </header>
  );
}
