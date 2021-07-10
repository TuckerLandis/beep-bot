import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import drBeep from './noback.png'


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome, human. Please log in or register to JAM');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h1>{heading}</h1>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <img className="robot-img" src={drBeep} alt="the doctor" />
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h3>Already a Member?</h3>
            <button className="btn btn_sizeSm nes-btn is-primary" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
