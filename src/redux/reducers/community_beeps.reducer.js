const communityBeeps = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMMUNITY_BEEPS':
        return action.payload;
    
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default communityBeeps;