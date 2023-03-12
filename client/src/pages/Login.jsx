import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Navbar from '../components/Navbar';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login, currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      if (currentUser?.role === 'admin' || 'lawyer') {
        navigate('/admin');
      } else {
        navigate('/apply');
      }
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className='auth'>
        <form>
          <h1>Login</h1>
          <input
            required
            type='email'
            placeholder='Email'
            name='email'
            onChange={handleChange}
          />
          <input
            required
            type='password'
            placeholder='Lösenord'
            name='password'
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
          <span>
            Har du inget konto? <Link to='/register'>Registrera dig</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
