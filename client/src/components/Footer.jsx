import React from 'react';
import Logo from '../img/logo2.webp';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt='' />
      <span>
        <b>Gjort av Hedbergsstiftelse</b>.
      </span>
    </footer>
  );
};

export default Footer;
