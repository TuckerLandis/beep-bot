import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

/**
 * Posts a beep to the beep table
 * @param {*} action 
 */
function* saveBeep(action) {
    console.log('Saving a new beep (saga) ...', action.payload);
    try {
        yield axios.post('/api/beep', action.payload) // post a new beep
        yield fetchUserBeeps // get userbeeps
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
        yield axios.delete(`/api/beep/${action.payload}`)
        yield put({
            type: 'FETCH_USER_BEEPS'
        })
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
        const response = yield axios.get('/api/beep/user')
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
    // send a get, set userBeep reducer to response
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

export function* beepSaga() {
    yield takeEvery('SAVE_NEW_BEEP', saveBeep);
    yield takeEvery('FETCH_USER_BEEPS', fetchUserBeeps)
    yield takeEvery('FETCH_COMMUNITY_BEEPS', fetchCommunityBeeps)
    yield takeEvery('DELETE_BEEP', deleteUserBeep)
}


export default beepSaga;