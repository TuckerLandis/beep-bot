const editBeepReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_BEEP':
        return action.payload;
    
      default:
        return state;
    }
  };
  

  export default editBeepReducer