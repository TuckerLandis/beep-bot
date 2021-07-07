import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';
import LikeButton from '../LikeButton/LikeButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

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
      <h1 className="page-title">Recent Beeps</h1>
      <br></br>

      {communityBeeps.map((beep, i) => {
        return (
          <div key={i} className="beep-item">

            <h1 className="beep-item-title">{beep.beep_name}</h1>
            <h2>{beep.user_name}</h2>
            <h3>Likes: {beep.likes}</h3>
            <h3>BPM: {beep.bpm}</h3>
            <div className="button-div">
              <PlayButton beep={beep} steps={beep.steps} key={i} />
              <LikeButton beep={beep} user={user} />
              <FavoriteButton beep={beep} user={user} />
            </div>

          </div>
          
        )
      })}

    </div>
  );
}


export default CommunityPage;
