import React from 'react';
import './Logo.scss';
import logo from '../../images/logo.png';

const Logo = () => (
  <a className="logo" href="/">
    <img src={logo} alt="logo" />
  </a>
);

export default Logo;
