//WIP

const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect, useState } from 'react';

import PlayButton from '../PlayButton/PlayButton';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

function FavoritesPage() {

    const dispatch = useDispatch() // declare dispatch for use below
    const userFaves = useSelector(store => store.userFaves)
    const user = useSelector((store) => store.user)
  
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
                <FavoriteButton beep={beep} user={user} />
              </div>
    
    
            )
          })}
    
        </div>
      )

}

export default FavoritesPage