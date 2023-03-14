import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from '../img/hedberg-top.png';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <img src={Logo} alt='' />
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/'>
            <h6>Hem</h6>
          </Link>
          {!currentUser && (
            <Link className='link' to='/apply'>
              <h6>Ansök</h6>
            </Link>
          )}
          {currentUser?.role === 'user' && (
            <Link className='link' to='/apply'>
              <h6>Ansök</h6>
            </Link>
          )}
          <Link className='link' to='/winners'>
            <h6>Tidigare pristagare</h6>
          </Link>
          <Link className='link' to='/gdpr'>
            <h6>GDPR-information</h6>
          </Link>
          <Link className='link' to='/contact'>
            <h6>Kontaktinfo</h6>
          </Link>
          {currentUser && currentUser?.role !== 'user' && (
            <Link className='link' to='/admin'>
              Adminsida
            </Link>
          )}
          <Link className='link' to='/profile'>
            {currentUser?.firstname}
          </Link>
          {currentUser ? (
            <span className='write' onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <Link className='write' to='/login'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
