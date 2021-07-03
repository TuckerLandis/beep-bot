import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

function LogOutButton(props) {
  const dispatch = useDispatch();
  const history = useHistory()

  function handleLogout () {
    dispatch({ type: 'LOGOUT' })
    history.push('/home')
  }

  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => handleLogout()}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
