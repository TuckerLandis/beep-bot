import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PlayButton from '../PlayButton/PlayButton';

function CommunityPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_COMMUNITY_BEEPS' });
  }, []);
  
  const communityBeeps = useSelector((store) => store.communityBeeps);

  return (
    <div className="container">
      <h2>Welcome!</h2>
      <p>Here are some beeps from your friends</p>


      {communityBeeps.map((beep, i) => {
        return (
          <div key={i} className="beep-item">
          <p>{beep.beep_name}</p> 
          <p>Steps: {JSON.stringify(beep.steps)}</p>
          <p>BPM: {beep.bpm}</p>

          <PlayButton beep={beep} steps={beep.steps} key={i}/>
          </div>
        
        
        )
      })}
      
    </div>
  );
}


export default CommunityPage;
