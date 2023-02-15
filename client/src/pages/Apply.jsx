import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import { ApplyContext } from '../context/applyContext';
import { useEffect } from 'react';
import Edit from '../img/edit.png';

const Apply = () => {
  const { currentUser } = useContext(AuthContext) || null;
  const { applications } = useContext(ApplyContext) || null;
  const [myApplication, setMyApplication] = useState();
  const navigate = useNavigate();

  if (currentUser?.role === 'admin') {
    navigate('/admin');
  }

  useEffect(() => {
    if (currentUser) {
      const myApplication = applications.filter(
        (application) => application.uid == currentUser.id
      )[0];
      setMyApplication(myApplication);
    }
  }, [currentUser]);

  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    uid: '',
    date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    cat: '',
  });
  const [err, setError] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(inputs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    setInputs((prev) => ({ ...prev, uid: currentUser.id }));
    try {
      await axios.post(`/posts/`, inputs);
      navigate('/');
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      {/* if not logged on */}
      {!currentUser ? (
        <>
          <div className='Apply'>
            <h1>
              Logga in eller registrerar dig för att göra en ansökan till
              hedbergs
            </h1>
            <span style={{ width: '100vh' }}>
              Detta är en gemensam ansökningsportal för Hedbergs stiftelse och
              Norlins stiftelse (norlinsstiftelse.se). <br /> Du ska bara göra
              en ansökan oavsett om din ansökan avser Hedbergs stiftelse
              (inflammatoriska sjukdomar), Norlins stiftelse (neurologiska
              sjukdomar) eller båda. Du behöver INTE precisera vilken stiftelse
              din ansökan avser.
            </span>
            <span style={{ margin: '5vh' }}>
              För att registrera dig: <Link to='/register'>Registrera</Link>
            </span>
            <span>
              För att logga in: <Link to='/login'>Login</Link>
            </span>
          </div>
        </>
      ) : (
        <div>
          {/*  if applicaiton has been submitted */}
          {myApplication ? (
            <>
              <h1> Din ansökan</h1>
              <p>{myApplication.title}</p>
              <div> {myApplication.desc}</div>
              <div>av</div>
              <div>{currentUser.username}</div>
              <div className='edit'>
                <Link to={`/write?edit=2`} state={myApplication}>
                  <img src={Edit} alt='' />
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* If start of application */}
              <h1>Påbörja din ansökan här!</h1>
              <form>
                <input
                  required
                  type='text'
                  placeholder='title'
                  name='title'
                  onChange={handleChange}
                />
                <input
                  required
                  type='text'
                  placeholder='desc'
                  name='desc'
                  onChange={handleChange}
                />
                <input
                  required
                  type='text'
                  placeholder='cat'
                  name='cat'
                  onChange={handleChange}
                />
                <button onClick={handleSubmit}>Nästa</button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Apply;
