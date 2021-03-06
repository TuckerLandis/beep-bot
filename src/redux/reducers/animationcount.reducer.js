const animationCount = (state = 0, action) => {
    switch (action.type) {
      case 'ANIMATION_COUNT':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default animationCount;