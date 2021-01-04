import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write from './write';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}

export default rootReducer;

// 1
// import { combineReducers } from 'redux';
// import auth from './auth';
// import loading from './loading';

// const rootReducer = combineReducers({
//   auth,
//   loading,
// });

// export default rootReducer;
