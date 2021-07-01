const communityBeeps = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMMUNITY_BEEPS':
        return action.payload;
    
      default:
        return state;
    }
  };
  
  export default communityBeeps;