const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
import * as Tone from 'tone'
import PlayButton from '../PlayButton/PlayButton';

/* 
! ToDo

!display = date created, name
!load button => selected beep reducer

*/ 

function UserBeeps () {
const dispatch = useDispatch() // declare dispatch for use below
const userBeeps = useSelector(store => store.userBeeps)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    console.log('user beeps :)', userBeeps);

    let userBeepList = [];

    // sets a local list to the return of store selector/userbeeps
    userBeeps.forEach(beep => 
      
        userBeepList.push( // this can change when i rewrite newbeep
            {
                oscillatorType: beep.osc_type,
                filter_type: beep.filter_type,
                filter_cutoff: beep.filter_cutoff,
                scale: beep.scale,
                octave: beep.ocatave,
                root: beep.root,
                bpm: beep.bpm,
                userSteps: beep.steps
                    }
        ))

    return (
          <div className="container">
      <h2>Your Beeps</h2>


      {userBeepList.map((beep, i) => {
          console.log(beep);
        return (
          <div key={i}>
              {/* TODO contain info about beep when DB represents it */}
          <p>Beepname</p>
          <PlayButton userBeep={beep} />
          </div>
        
        
        )
      })}
      
    </div>
    )
}

export default UserBeeps