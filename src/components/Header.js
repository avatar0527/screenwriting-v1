import React from 'react';
import { Link } from 'react-router-dom';

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
      </div>
    </div>
  );
};

export default Header;
