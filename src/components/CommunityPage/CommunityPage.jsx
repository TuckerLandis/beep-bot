import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';

import './Community.css'

function CommunityPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_COMMUNITY_BEEPS' });
  }, []);
  
  const communityBeeps = useSelector((store) => store.communityBeeps);
  const user = useSelector((store) => store.user)

  function LikeButton(beep) {
    if (beep.users_that_like.includes(user.id)) {
      return (
        <button className="nes-btn"><i class="nes-icon is-medium heart is-full"></i></button>
      )
    } else {
      return (
        <button className="nes-btn" onClick={()=>{handleLike(beep)}}><i class="nes-icon is-medium heart is-empty"></i></button>
      )
    }
  }

  function handleLike (beep) {
    if (beep.users_that_like.includes(user.id)) {
      return
    } else {
      dispatch({
        type:"LIKE_BEEP",
        payload: {
          beep : beep,
          user : user
        }
      })
    }


  } 

  return (
    <div className="container">
      <h1>Recent Beeps</h1>
      <br></br>
      


      {communityBeeps.map((beep, i) => {
        return (
          <div key={i} className="beep-item">
          <h2>{beep.beep_name}</h2> 
          <h4>{beep.user_name}</h4>
          <h3>Steps: {JSON.stringify(beep.steps)}</h3>
          <h3>BPM: {beep.bpm}</h3>

          <PlayButton beep={beep} steps={beep.steps} key={i}/>
          <LikeButton beep ={beep}/>
          </div>
        
        
        )
      })}
      
    </div>
  );
}


export default CommunityPage;
