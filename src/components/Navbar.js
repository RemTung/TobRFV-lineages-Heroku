import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            ToBRFV 
            <i class="fas fa-dna" />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <a href='http://localhost:5000' target="_blank" rel="noopener noreferrer" className='nav-links' onClick={closeMobileMenu}>
                Docs
              </a>
            </li>
            <li className='nav-item'>
              <Link
                to='/tree'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Tree
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/my-data'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                My Data
              </Link>
            </li>

            <li>
              <Link
                to='/upload'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Upload
                <i class="fas fa-file-upload"/>
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>UPLOAD   <i class="fas fa-arrow-circle-up"></i></Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
