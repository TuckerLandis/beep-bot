const { useDispatch, useSelector } = require("react-redux");
import React, { useEffect } from 'react';

/* 
! ToDo
display, play button dummy. look into abstracting synth before proceding with play
!display = date created, name
!load button => selected beep reducer

*/ 
function UserBeeps () {
const dispatch = useDispatch() // declare dispatch for use below
const userBeepsList = useSelector(store => store.userBeeps)

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_BEEPS' });
      }, []);

    console.log('user beeps :)', userBeepsList);

    return (
        <div><p>User Beeps check console</p></div>
    )
}

export default UserBeeps