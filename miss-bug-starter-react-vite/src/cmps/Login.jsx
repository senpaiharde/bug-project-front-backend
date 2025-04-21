import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../services/auth.service';
import { Link } from 'react-router-dom';

export function Login({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
      alert(`Welcome ${user.fullname}`);

      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('login failed');
    }
  }

  return (
    <form className="box">
      <div className="login">
        <div className="loginBx">
          <h2>
            <i className="fa-solid fa-right-to-bracket"></i>
            Login
            <i className="fa-solid fa-heart"></i>
          </h2>
          <input
            type="text"
            placeholder="Email"
            autoComplete="Email"
            onChange={handleChange}
            name="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <input type="submit" value="Sign in" onSubmit={onSubmit} />
          <div className="group">
            <a href="#">Forgot Password</a>
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </form>
  );
}
