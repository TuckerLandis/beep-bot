import { combineReducers } from 'redux';
import communityBeeps from './community_beeps.reducer';
import errors from './errors.reducer';
import user from './user.reducer';
import userBeeps from './userbeeps.reducer';
import editBeepReducer from './editbeep.reducer';
import userFaves from './userfaves.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  userBeeps, // place for user beeps, populated on load of "your beeps page"
  communityBeeps,
  editBeepReducer,
  userFaves
});

export default rootReducer;
