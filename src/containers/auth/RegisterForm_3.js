import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

//+ 회원 가입 성공후 check를 호출-> 현재 사용자의 로그인 상태 확인
import { check } from '../../modules/user';

const RegisterForm = (e) => {
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
    if (password !== passwordConfirm) {
      //오류처리
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
      console.log('오류발생');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  //유저 값이 잘 설정되어 있는지 확인
  useEffect(() => {
    if (user) {
      console.log('check api 성공');
      console.log(user);
    }
  }, [user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
