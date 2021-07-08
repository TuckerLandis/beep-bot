const animationCount = (state = 0, action) => {
    switch (action.type) {
      case 'ANIMATION_COUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default animationCount;