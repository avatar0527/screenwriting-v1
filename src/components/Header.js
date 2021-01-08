import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        Screenwriter 0.1.0
      </Link>
      <div className='right menu'>
        <Link to='/' className='item'>
          All Screenplays
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
