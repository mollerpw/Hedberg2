import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(inputs.email)) {
      setError('Inte giltig email');
    } else {
      try {
        await axios.post('/auth/register', inputs);
        navigate('/login');
      } catch (err) {
        setError(err.response.data);
      }
    }
  };

  return (
    <>
      <div className='auth'>
        <form>
          <h1>Registrera</h1>
          <input
            required
            type='text'
            placeholder='Förnamn'
            name='username'
            onChange={handleChange}
          />
          <input
            required
            type='text'
            placeholder='Efternamn'
            name='lastname'
            onChange={handleChange}
          />
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
            minLength='2'
          />
          <button onClick={handleSubmit}>Registrera</button>
          {err && <p>{err}</p>}
          <span>
            Har du ett konto? <Link to='/login'>Logga in</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
