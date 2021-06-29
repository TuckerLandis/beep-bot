import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

function CommunityPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_COMMUNITY_BEEPS' });
  }, []);
  
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Here are some beeps from your friends</p>
      
    </div>
  );
}


export default CommunityPage;
