import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
//import AuthForm from '../components/auth/AuthForm';
import LoginForm from '../containers/auth/LoginForm';

const LoginPage = () => {
  return (
    <AuthTemplate>
      {/* <AuthForm type="login" /> */}
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
