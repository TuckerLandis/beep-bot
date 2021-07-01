const editBeepReducer = (state = {}, action) => {
    switch (action.type) {
      case 'LOAD_BEEP':
        return action.payload;
      case 'EDIT_SELECTED':
       state = {...state, [action.payload.key] : action.payload.value}
      return state;
      case 'EDIT_SELECTED_STEPS':
        state = {...state, steps : action.payload}
        return state
    
      default:
        return state;
    }
  };
  

  export default editBeepReducer