const { useDispatch } = require("react-redux");
import React, { useEffect } from 'react';

function UserBeeps () {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    // use selector user beeps


    return (
        <div><p>User Beeps check console</p></div>
    )
}

export default UserBeeps