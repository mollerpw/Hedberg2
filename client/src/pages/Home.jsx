import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  
  
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`);
        setPosts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className='home'>
      <div className='posts'>
        <div className='post'>
          <div className='img'>
            <img
              src='https://www.hedbergsstiftelse.se/media/frontpage.jpg'
              alt=''
            />
          </div>
          <div className='content'>
            Anslag till medicinsk forskning Stiftelsen Apotekare Hedbergs fond
            för medicinsk forskning och Bertil och Ebon Norlins stiftelse för
            medicinsk forskning* avser att dela ut sammanlagt cirka två miljoner
            kronor för avancerad medicinsk forskning i Sverige. Stiftelserna
            kommer att prioritera projekt inom områdena inflammatoriska
            sjukdomar och neurologiska sjukdomar. Beloppet kommer att fördelas
            mellan högst 10 sökanden. Om ansökan avser en del av ett större
            projekt, kan forskningsprogram för detta bifogas ansökan. I annat
            fall ska separat forskningsprogram (högst 4 sidor) samt
            personuppgifter (CV) för huvudsökanden bifogas. Hypotes och
            projektplan ska vara skrivna på svenska språket. Anslagen kommer att
            delas ut under mars månad 2023 och utbetalas via mottagarens
            institution. Vetenskaplig och ekonomisk redovisning skall ske till
            stiftelsen inför eventuellt ny ansökan eller senast inom tre år.
            GDPR (dataskyddsförordningen) Sökanden uppmärksammas på att
            registrering av personuppgifter kommer att ske. Anslagsmottagarnas
            namn kommer att läggas ut på stiftelsens hemsida och deras
            ansökningshandlingar sparas i 10 år. Icke beviljade ansökningar
            sparas i 5 år. Ansöksformuläret når du via länken till vänster.
            Ansökan ska vara inlämnad senast den 15 november 2022.
            Ansökningsblanketten, undertecknad av sökanden och dennes prefekt
            ska därefter, inom 7 dagar, skickas till stiftelserna, skannad genom
            e-post till adress: je@eslaw.se *Du behöver inte specificera vilken
            stiftelse du ansöker till.
          </div>
        </div>
        {/* {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={`../upload/${post.img}`} alt='' />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button>Read More</button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Home;
