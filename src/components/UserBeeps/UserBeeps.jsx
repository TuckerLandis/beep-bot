const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect } from 'react';

function UserBeeps () {
const dispatch = useDispatch() // declare dispatch for use below
const userBeepsList = useSelector(store => store.userBeeps)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    // use selector user beeps

    console.log(userBeepsList);


    return (
        <div><p>User Beeps check console</p></div>
    )
}

export default UserBeeps