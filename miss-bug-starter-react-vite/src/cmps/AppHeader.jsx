import { useEffect } from 'react';
import { UserMsg } from './UserMsg';
import { Link, Navigate, NavLink } from 'react-router-dom';
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
            <>
              <h2>Welcome {user.fullname || user.email}</h2>
              <button className="headerbutton" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <div>
              <Link to="/login">
                <button className="headerbutton">Login</button>
              </Link>
              <Link to="/signup">
                <button className="headerbutton">Signup</button>
              </Link>
            </div>
          )}
        </div>

        <nav className="app-nav">
          <NavLink to="/">Home</NavLink> | <NavLink user={user} to="/tracker/bug">Bugs</NavLink> |
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
      <UserMsg />
    </header>
  );
}
