const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
import PlayButton from '../PlayButton/PlayButton';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';

import './UserBeep.css'
import SwalClassObject from '../../assets/SwalClassObject/SwalClassObject';



function UserBeeps() {
  const history = useHistory()
  const dispatch = useDispatch() // declare dispatch for use below
  const userBeeps = useSelector(store => store.userBeeps)

  useEffect(() => {
    dispatch({ type: 'FETCH_USER_BEEPS' });
  }, []);

  /**
   * Deletes the selected Beep from the DB. gives a confirm dialog before proceeding
   * @param {*} beep 
   */
  function deleteBeep(beep) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This is permanent!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      customClass: SwalClassObject,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${beep.beep_name} has been deleted`,
          showConfirmButton: false,
          timer: 1500,
          customClass: SwalClassObject,
        })

        dispatch({
          type: 'DELETE_BEEP',
          payload: beep.beep_id
        })
      }
    })
  }

  /**
   * Sends user to the edit page with the beep ID in URL. 
   * @param {*} beep 
   */
  function editBeep(beep) {
    dispatch({
      type: "SELECT_BEEP",
      payload: beep.beep_id
    })
    history.push(`/edit/${beep.beep_id}`)
  }


  return (
    <div className="container">
      <h1 className="page-title">Your Beeps</h1>


      {userBeeps.map((beep, i) => {
        // console.log(beep);
        return (
          <div key={i} className="beep-item">
            <div>
              <h1 className="beep-item-title">{beep.beep_name}</h1>

            </div>
            <h3>Scale: {beep.scale}</h3>
            <h3>Root: {beep.root}</h3>
            <h3>Octave: {beep.octave}</h3>
            <h3>Likes: {beep.likes}</h3>
            <h3>Date Created: {beep.date_created.slice(0, beep.date_created.length - 14)}</h3>
            <PlayButton beep={beep} key={i} />
            <button className="nes-btn is-error" onClick={() => deleteBeep(beep)}>delete</button>
            <button className=" nes-btn is-warning" onClick={() => editBeep(beep)}>load</button>
          </div>


        )
      })}

    </div>
  )
}

export default UserBeeps