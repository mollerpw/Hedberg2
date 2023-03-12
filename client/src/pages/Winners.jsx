import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Winners = () => {
  const [winners, setWinners] = useState([]);

  const [year, setYear] = useState('2022');

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/winners?year=${year}`);
        if (Array.isArray(res.data)) {
          setWinners(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [year]);

  const handleChange = async (e) => {
    e.preventDefault();
    setYear(e.target.value);
  };

  return (
    <>
      <div className='dropdown'>
        <select className='select' onChange={handleChange} value={year}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
          <option value='2018'>2018</option>
          <option value='2017'>2017</option>
        </select>
      </div>
      <div style={{ textAlign: 'center' }} className='posts'>
        {!winners ? (
          <></>
        ) : (
          <>
            {winners?.map((winner) => (
              <div className='post' key={winner.id}>
                <div className='content'>
                  <h1>
                    {getText(winner.firstname)} {getText(winner.lastname)}{' '}
                    {getText(winner.prize)}:-
                  </h1>
                  <p>{getText(winner.projectname)}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Winners;
