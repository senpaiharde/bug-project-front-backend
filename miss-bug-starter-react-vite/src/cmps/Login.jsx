import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../services/auth.service';
import { Link } from 'react-router-dom';

export function Login({ setUser }) {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  const navigate = useNavigate();

  

  async function onSubmit(ev) {
    ev.preventDefault();
    try {
      const {token,user} = await login({ email, password });
      console.log('Logged in:', { token, user });
      if (!token || !user) throw new Error('Invalid login data');
      setUser(user);
      alert(`Welcome ${user.fullname}`);
      navigate('/tracker/bug');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert('login failed');
      setError(err.response?.data?.err || err.message);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
             value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <input type="submit" value="Sign in"  />
          <div className="group">
            <a href="#">Forgot Password</a>
            <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}
