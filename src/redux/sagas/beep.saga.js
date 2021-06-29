import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';



function* saveBeep (action) {
    console.log('Saving a new beep (saga) ...', action.payload);
    try {
        yield axios.post('/api/beep', action.payload)
        // yield put get the beeps
    } catch (error) {
        console.log(error);
        
    }
}

function* fetchUserBeeps (action) {
    console.log('Fetching user beeps ...')
    
    try {
        const response = yield axios.get('/api/beep/user')
        yield put({
            type: 'SET_USER_BEEPS',
            payload: response
        })
    } catch (error) {
        console.log(error);
        
    }
}

export function* beepSaga() {
    yield takeEvery('SAVE_NEW_BEEP', saveBeep);
    yield takeEvery('FETCH_USER_BEEPS', fetchUserBeeps)
  }
  
  
    export default beepSaga;