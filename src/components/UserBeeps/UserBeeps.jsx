const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone'
import PlayButton from '../PlayButton/PlayButton';

/* 
! ToDo

!load button => selected beep reducer

*/ 

function UserBeeps () {
const dispatch = useDispatch() // declare dispatch for use below
const userBeeps = useSelector(store => store.userBeeps)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);


    console.log('user beeps :)', userBeeps);

    return (
          <div className="container">
      <h2>Your Beeps</h2>


      {userBeeps.map((beep, i) => {
          console.log(beep);
        return (
          <div key={i}>
              {/* TODO contain info about beep when DB represents it */}
          <p>Beepname</p>
          <PlayButton beep={beep} key={i}/>
          </div>
        
        
        )
      })}
      
    </div>
    )
}

export default UserBeeps