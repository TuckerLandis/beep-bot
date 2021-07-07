//WIP

const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';
function UserBeeps() {

    const dispatch = useDispatch() // declare dispatch for use below
    const userFaves = useSelector(store => store.userFaves)
  
    useEffect(() => {
      dispatch({ type: 'FETCH_USER_FAVES' });
    }, []);

    return (
        <div className="container">
          <h1 className="page-title">Your Favorites</h1>
    
    
          {userFaves.map((beep, i) => {
   
            return (
              <div key={i} className="beep-item">
                <div>
                  <h1 className="beep-item-title">{beep.beep_name}</h1>
    
                </div>
                <h2>{beep.user_name}</h2>
                <h3>Likes: {beep.likes}</h3>
                <PlayButton beep={beep} key={i} />
                
              </div>
    
    
            )
          })}
    
        </div>
      )

}
