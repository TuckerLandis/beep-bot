import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';

function* saveBeep (action) {
    console.log('Saving a new beep (saga)', action.payload);
    try {
        yield axios.post('/api/beep')
    }
}

export function* beepSaga() {
    yield takeEvery('SAVE_NEW_BEEP', saveBeep);
    
  }
  
  
    export default beepSaga;