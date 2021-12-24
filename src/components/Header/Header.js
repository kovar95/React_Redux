import React from 'react';
import './Header.scss';
import Search from '../Search/Search';
import Logo from '../Logo/Logo';

const Header = () => (
  <header>
    <div className="main-wrapper">
      <Logo />
      <Search />
    </div>
  </header>
);

export default Header;
