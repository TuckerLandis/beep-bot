const userFaves = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_FAVES':
        return action.payload;
    
      default:
        return state;
    }
  };
  
  export default userFaves;