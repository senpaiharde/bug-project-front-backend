import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../services/auth.service';
import { Link } from 'react-router-dom';

export function Signup(setUser) {
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
      setUser(user)
      navigate('/');
    } catch (err) {
      alert('login failed');
    }
  }

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <input name="fullname" placeholder="Full Name" onChange={handleChange} />
        <button>Signup</button>
      </form>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </section>
  );
}
