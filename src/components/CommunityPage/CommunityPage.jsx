import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import LikeButton from '../LikeButton/LikeButton';

import './Community.css'

function CommunityPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_COMMUNITY_BEEPS' });
  }, []);

  const communityBeeps = useSelector((store) => store.communityBeeps);
  const user = useSelector((store) => store.user)


  return (
    <div className="container">
      <h1>Recent Beeps</h1>
      <br></br>

      {communityBeeps.map((beep, i) => {
        return (
          <div key={i} className="beep-item">

            <h1>{beep.beep_name}</h1>
            <h3>{beep.user_name}</h3>
            <h3>Steps: {JSON.stringify(beep.steps)}</h3>
            <h3>BPM: {beep.bpm}</h3>
            <div className="button-div">
              <PlayButton beep={beep} steps={beep.steps} key={i} />
              <LikeButton beep={beep} user={user} />
            </div>

          </div>



        )
      })}

    </div>
  );
}


export default CommunityPage;
