import React, { useEffect, useState } from 'react'; //+ useState
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  //+상황별 에러 메시지 제공
  const [error, setError] = useState(null);

  //성공 시 홈화면으로 이동2
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋변경 이벤트핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  //폼등록 이벤트핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    //+ 에러 메시지 : 하나라도 비어 있다면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    //+ 에러 메시지 : 비번이 다른 경우
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    dispatch(register({ username, password }));
  };

  //useEffect()와 initalizeForm()를 통해, 컴포넌트 첫 렌더링 시 form 초기화
  // <- 이 작업을 해야 로그인 후 뒤로가기 했을 경우 값이 유지된 상태 페이지다 나옮
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공-실패 처리
  useEffect(() => {
    if (authError) {
      //이미 계정이 있을때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다');
        return;
      }
      //기타 이유
      setError('회원가입 실패');
      return;
    }
    // if (authError) {
    //   console.log('오류발생');
    //   console.log(authError);
    //   return;
    // }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //user 값이 잘 설정되어 있는지 확인
  useEffect(() => {
    if (user) {
      console.log('check api 성공');
      console.log(user);
      history.push('/'); //성공 시 홈화면으로 이동4

      //+++ localStorage를 사용하여 로그인 상태 유지
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]); //성공 시 홈화면으로 이동3

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(RegisterForm); //성공 시 홈화면으로 이동5
