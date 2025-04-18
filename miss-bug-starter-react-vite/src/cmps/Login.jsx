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
    <section className="loginForm">
      <h2 className="login">Login</h2>
      <form onSubmit={onSubmit}>
        <input
          style={{ marginLeft: '75px' }}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          style={{ marginLeft: '15px' }}
          name="password"
          autoComplete="current-password" 
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button style={{ marginLeft: '15px' }} className="headerbutton">
          Login
        </button>
      </form>
      <Link to="/signup">
        <button style={{ marginTop: '15px' }} className="headerbutton">
          Signup
        </button>
      </Link>
    </section>
  );
}
