import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../services/auth.service';
import { Link } from 'react-router-dom';

export function Signup({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '', fullname: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const navigate = useNavigate();

  

  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      const user = await signup(credentials);
      alert(`Welcome ${user.fullname}`);
      setUser(user);
      navigate('/');
    } catch (err) {
      alert('login failed');
    }
  }

  return (
    <div className="FormMain">
      <form className="box" onSubmit={onSubmit}>
        <div className="login">
          <div className="loginBx">
            <h2>
              <i className="fa-solid fa-right-to-bracket"></i>
              Sign up
              <i className="fa-solid fa-heart"></i>
            </h2>

            <input
              type="text"
              autoComplete="Email"
              name="email"
              placeholder="Email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
              autoComplete="current-password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              autoComplete="full-name"
              name="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input type="submit" value="Sign in" />
            <div className="group">
              <a href="#">Back to Home</a>
              <a href="/login">Sign In</a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
