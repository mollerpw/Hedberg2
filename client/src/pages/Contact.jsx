import React from 'react';

function Contact() {
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
            Kontaktinformation <br />
            Kontakta oss om du har frågor om ansökan. <br />
            <br />
            Adress:
            <br /> Stiftelsen Apotekare Hedbergs Fond
            <br /> c/o advokat Jonas Eilert
            <br />
            Stadsbudsgatan 12
            <br /> 227 36 Lund
            <br />
            <br /> Kontakt:
            <br /> 0706-44 16 68
            <br /> E-mail:
            <br />
            je@eslaw.se
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
