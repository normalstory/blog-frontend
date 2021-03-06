import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

//+2 src/models/auth.js를 리팩토링(6종 액션타입의 코드 반복 줄이기)하기 위한 함수 선언
export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

//1
export default function createRequstSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    yield put(startLoading(type)); //로딩 시작
    try {
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response, //+ for 페이지 네이션
        // meta값을 response를 넣어주면 나중에 http 헤더 및 상태코드를 쉽게 조회가능
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}
