import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

/**
 * Posts a beep to the beep table
 * @param {*} action 
 */
function* saveBeep(action) {
    console.log('Saving a new beep (saga) ...', action.payload);

    try {
        // set a 'response' variable to the return from the DB
       const response = (yield axios.post('/api/beep', action.payload.beep)) // post a new beep
       console.log('response from post:', response.data);
        // console.log('response from post:', response);
       

    //     // run the push to edit function sent with the dispatch with an argument of the newly
    //     // created beep's ID. push user to edit page with the ID in URL params for data persist
        yield action.payload.pushToEdit(response.data.beep_id)
        // this function is passed in the action dispatch from the save button on the new beep page
        yield fetchUserBeeps() // get userbeeps
    } catch (error) {
        console.log(error);
        

    }
}

/**
 * Deletes a beep. action.payload === beep_id
 * @param {*} action 
 */
function* deleteUserBeep(action) {
    console.log('deleting...', action.payload);

    try {
        //sends a delete to the beep router, using the ID of the beep object in the userBeeps reducer
        yield axios.delete(`/api/beep/${action.payload}`)
        // refresh user beeps upon delete
        yield fetchUserBeeps()
    } catch (error) {
        console.log(error);
    }

}

/**
 * // Gets user beeps, set userBeep reducer to response from DB
 * @param {*} action 
 */
function* fetchUserBeeps(action) {
    console.log('Fetching user beeps ...')
    try {
        // get the user beeps on page load of the userbeeps page. sends that db response to the user beeps reducer
        const response = yield axios.get('/api/beep/user')
        // sends action to set the user beeps to the response from the user beep get
        yield put({
            type: 'SET_USER_BEEPS',
            payload: response.data
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * Fetches all beeps not associated with the user, and sets the community reducer to response from DB
 * @param {*} action 
 */
function* fetchCommunityBeeps(action) {
    console.log('Fetching community beeps ...')
    // send a get, set communityBeeps reducer to response
    try {
        const response = yield axios.get('/api/beep/community')
        yield put({
            type: 'SET_COMMUNITY_BEEPS',
            payload: response.data
        })
    } catch (error) {
        console.log(error);

    }
}

/**
 *  Selects a beep for loading into the edit page
 */
function* selectBeep(action) {
    console.log('Selecting a beep for edit...', action.payload);
    try {
        // gets a specific beep upon load, the ID of which is set upon load button press in the userbeeps page
        const response = yield axios.get(`/api/beep/edit/${action.payload}`)
        // 'load' the specific beep into the editbeep reducer, for manipulation on the edit page
        yield put({
            type: 'LOAD_BEEP',
            payload: response.data[0]   /// <--------added trying to fix render edit bug
        })
    } catch (error) {
        console.log(error);
    }
}


/**
 * Upon pressing save on the edit page, this action is dispatched to yield a PUT request to update the entry for the loaded beep
 * 
 * @param {*} action 
 */
function* updateBeep(action) {
    console.log('Updating a beep', action.payload);
    try {
        yield axios.put(`/api/beep/${action.payload.beep_id}`, action.payload)
        yield put({
            type:'FETCH_USER_BEEPS'
        })
    } catch (error) {
        console.log(error);
    }
}

/**
 * 
 * @param {*} action 
 */
function* likeBeep(action) {
    console.log('liking a beep (saga)', action);
    try {
        yield axios.put(`/api/beep/like/${action.payload.beep_id}`, action.payload)
        yield put({
            type: "FETCH_COMMUNITY_BEEPS"
        })
    } catch (error) {
        console.log(error);
        
    }

}

/**
 * 
 * @param {*} action 
 */
 function* unlikeBeep(action) {
    console.log('un-liking a beep (saga)', action);
    try {
        yield axios.put(`/api/beep/unlike/${action.payload.beep_id}`, action.payload)
        yield put({
            type: "FETCH_COMMUNITY_BEEPS"
        })
    } catch (error) {
        console.log(error);
        
    }

}

// combine and export sagas
export function* beepSaga() {
    yield takeEvery('SAVE_NEW_BEEP', saveBeep);
    yield takeEvery('FETCH_USER_BEEPS', fetchUserBeeps)
    yield takeEvery('FETCH_COMMUNITY_BEEPS', fetchCommunityBeeps)
    yield takeEvery('DELETE_BEEP', deleteUserBeep)
    yield takeEvery('SELECT_BEEP', selectBeep)
    yield takeEvery('UPDATE_BEEP', updateBeep)
    yield takeEvery('LIKE_BEEP', likeBeep)
    yield takeEvery('UNLIKE_BEEP', unlikeBeep)
}


export default beepSaga;