import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = (e) => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
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
    //구현예정
  };

  //useEffect()와 initalizeForm()를 통해, 컴포넌트 첫 렌더링 시 form 초기화
  // <- 이 작업을 해야 로그인 후 뒤로가기 했을 경우 값이 유지된 상태 페이지다 나옮
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

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
