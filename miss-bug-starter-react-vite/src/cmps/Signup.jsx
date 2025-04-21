import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../services/auth.service';
import { Link } from 'react-router-dom';

export function Signup({ setUser }) {
  const [credentials, setCredentials] = useState({ email: '', password: '', fullname: '' });

  const navigate = useNavigate();

  function handleChange(ev) {
    const { name, value } = ev.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

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

  return (<div className='FormMain'>
    <form className="box"  onSubmit={onSubmit}>
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
          style={{ marginLeft: '75px' }}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          style={{ marginLeft: '15px' }}
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <input
          style={{ marginLeft: '15px' }}
          name="fullname"
          placeholder="Full Name"
          onChange={handleChange}
        />
          <div className="group">
            
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}
  );
}
