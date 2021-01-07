import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
});

//api와 연동되는 saga
export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga()]);
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
