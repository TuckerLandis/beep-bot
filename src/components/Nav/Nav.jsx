import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/community';
    loginLinkData.text = 'Community';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Beep Bot</h2>
      </Link>
      <Link className="navLink" to="/newbeep">
          New Beep +
        </Link>
        <Link className="navLink" to="/userbeeps">
          Your Beeps
        </Link>
      
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>
{/* 
        {user.id && (
          <>
             <Link className="navLink" to="/info">
              Info Page
            </Link>
            <LogOutButton className="navLink" /> 
          </> 
        )} */}

        <Link className="navLink" to="/about">
          About
        </Link>
      
    </div>
  );
}

export default Nav;
