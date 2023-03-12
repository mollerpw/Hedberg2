import React, { useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import DOMPurify from 'dompurify';
import { ApplyContext } from '../context/applyContext';

const Single = () => {
  const [post, setPost] = useState({});
  const { applications } = useContext(ApplyContext) || null;
  const applicationIndex = applications.map((o) => o.id);
  const minId = Math.min(...applications.map((o) => o.id));
  const maxId = Math.max(...applications.map((o) => o.id));
  const [grade, setGrade] = useState('0');
  const [oldGrade, setOldGrade] = useState() || null;

  console.log(grade);
  console.log(oldGrade);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split('/')[2];

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        const res2 = await axios.get(`/grades/${postId}/${currentUser.id}`);
        setGrade(res2.data[0]?.grade);
        setOldGrade(res2.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = {
      gradeid: oldGrade?.gradeid,
      grade: grade,
      applicationid: parseInt(postId),
      userid: currentUser.id,
    };
    console.log(inputs);

    try {
      if (oldGrade) {
        await axios.put(`/grades/`, inputs);
        navigate('/admin');
      } else {
        await axios.post(`/grades/`, inputs);
        navigate('/admin');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className='single'>
      <div className='content'>
        <div className='posts'>
          <Link className='link' to='/admin'>
            Gå tillbaka
          </Link>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: '3vh',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h3 style={{ marginRight: '1vh' }}> Ansökan </h3>
                  <h3 style={{ marginRight: '1vh' }}>
                    {applicationIndex.indexOf(post.id) + 1}
                  </h3>
                  <h3 style={{ marginRight: '1vh' }}> av </h3>
                  <h3>{applicationIndex.slice(-1)}</h3>
                </div>
                <div>
                  {postId == minId ? (
                    <button
                      style={{ margin: '10px', backgroundColor: 'gray' }}
                      disabled
                    >
                      {' '}
                      Föregående ansökan
                    </button>
                  ) : (
                    <button
                      style={{ margin: '10px' }}
                      onClick={() => navigate(`/post/${parseInt(postId) - 1}`)}
                    >
                      Föregående ansökan
                    </button>
                  )}
                  {postId == maxId ? (
                    <button disabled style={{ backgroundColor: 'gray' }}>
                      {' '}
                      Nästa ansökan
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/post/${parseInt(postId) + 1}`)}
                    >
                      Nästa ansökan
                    </button>
                  )}
                </div>
                <form className='grades'>
                  <input
                    value='1'
                    checked={grade === '1'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('1')}
                  />{' '}
                  1
                  <input
                    value='2'
                    checked={grade === '2'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('2')}
                  />{' '}
                  2
                  <input
                    value='3'
                    checked={grade === '3'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('3')}
                  />{' '}
                  3
                  <input
                    value='4'
                    checked={grade === '4'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('4')}
                  />{' '}
                  4
                  <input
                    value='5'
                    checked={grade === '5'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('5')}
                  />{' '}
                  5
                  <input
                    value='0'
                    checked={grade === '0'}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='radio'
                    onChange={(e) => setGrade('0')}
                  />{' '}
                  Avstå att betygsätta
                  <button
                    onClick={handleSubmit}
                    name='grade'
                    style={{ marginLeft: '20px' }}
                    type='submit'
                  >
                    Spara betyg
                  </button>
                </form>
              </div>
            </div>
            <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
              {post.img && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '5vh',
                  }}
                >
                  <h3>Bilagor:</h3>
                  <a href={`../upload/${post?.img}`} alt=''>
                    {post.img}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className='user'>
            {post.userImg && <img src={post.userImg} alt='' />}
            <div className='info'>
              <span>Namn: {post.username}</span>
              <p>Upplagd {moment(post.date).format('YYYY-MM-DD HH:mm:ss')}</p>
            </div>
            {currentUser?.username === post.username && (
              <div className='edit'>
                <Link to={`/write?edit=2`} state={post}>
                  <img src={Edit} alt='' />
                </Link>
                <img onClick={handleDelete} src={Delete} alt='' />
              </div>
            )}
          </div>
          <h1>Titel: {post.title}</h1>
          <h3>Sammanfattning:</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>{' '}
        </div>
      </div>
    </div>
  );
};

export default Single;
