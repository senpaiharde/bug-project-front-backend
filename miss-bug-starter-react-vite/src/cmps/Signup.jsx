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
    <div className="FormMain">
      <form className="box" onSubmit={onSubmit}>
        <div className="login">
          <div className="loginBx">
            <h2>
              <i className="fa-solid fa-right-to-bracket"></i>
              Sign up
              <i className="fa-solid fa-heart"></i>
            </h2>

            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <input
              autoComplete="full-name"
              name="fullname"
              placeholder="Full Name"
              onChange={handleChange}
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
