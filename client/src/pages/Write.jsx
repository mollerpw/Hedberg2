import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');
  const [oldFile, setOldFile] = useState(state?.img);
  console.log(state);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = '';
    if (file) {
      imgUrl = await upload();
    }
    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value.slice(3, -4),
            cat,
            img: file ? imgUrl : '',
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value.slice(3, -4),
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add'>
      <div className='content'>
        <label>Titel:</label>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Sammanfattning:</label>
        <div className='editorContainer'>
          <ReactQuill
            className='editor'
            theme='snow'
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Bilagor</h1>
          <span>Bifoga filer genom att trycka på ladda upp bilagor nedan</span>
          <span>
            <b>Tidigare uppladdade filer: </b>
          </span>
          <span>{oldFile}</span>
          <input
            style={{ display: 'none' }}
            type='file'
            id='file'
            name=''
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className='file' htmlFor='file'>
            Ladda upp bilagor
          </label>
          {file?.name}
          <div className='buttons'>
            {/* <button>Save as a draft</button> */}
            <button onClick={handleClick}>Publisera</button>
          </div>
        </div>
        <div className='item'>
          <h1>Projektets natur:</h1>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'group'}
              name='cat'
              value='group'
              id='group'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='group'>
              Ansökan avser en specifik del inom ett större projekt
            </label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'independent'}
              name='cat'
              value='independent'
              id='independent'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='independent'>
              Ansökan avser ett fristående projekt
            </label>
            {/* </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'technology'}
              name='cat'
              value='technology'
              id='technology'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='technology'>Technology</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'cinema'}
              name='cat'
              value='cinema'
              id='cinema'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='cinema'>Cinema</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'design'}
              name='cat'
              value='design'
              id='design'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='design'>Design</label>
          </div>
          <div className='cat'>
            <input
              type='radio'
              checked={cat === 'food'}
              name='cat'
              value='food'
              id='food'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor='food'>Food</label> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
