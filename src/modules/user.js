import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects'; //++++ 로그아웃
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; // 새로고침 이후 임시 로그인 처리
//회원정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const LOGOUT = 'user/LOGOUT'; //++++ 로그아웃

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT); //++++ 로그아웃

const checkSaga = createRequestSaga(CHECK, authAPI.check);

//+++ 로그인 검증 실패 시 localstorage 정보 초기화
function checkFailureSaga() {
  try {
    //localStorage.setItem('user', JSON.stringify(user));
    //->
    localStorage.removeItem('user'); //localstorage에서 user제거
  } catch (e) {
    console.log('localStorage is not working');
  }
}

//++++ 로그아웃
function* logoutSaga() {
  try {
    yield call(authAPI.logout); //logout API 호출
    localStorage.removeItem('user'); //localstorage에서 user제거
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga); //+++ 로그인 검증 실패 시 localstorage 정보 초기화
  yield takeLatest(LOGOUT, logoutSaga); //++++ 로그아웃
}

const initialState = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    //++++ 로그아웃
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);
