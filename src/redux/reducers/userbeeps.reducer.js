const userBeeps = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_BEEPS':
        return action.payload;
    
      default:
        return state;
    }
  };
  
  export default userBeeps;