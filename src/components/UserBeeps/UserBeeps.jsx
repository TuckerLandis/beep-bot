const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
import PlayButton from '../PlayButton/PlayButton';
import Swal from 'sweetalert2'

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

      function deleteBeep (beep) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            dispatch({
                type: 'DELETE_BEEP',
                payload: beep.beep_id
            })
          }
        })



      }

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
          <button onClick={() => deleteBeep(beep)}>Delete</button>
          </div>
        
        
        )
      })}
      
    </div>
    )
}

export default UserBeeps