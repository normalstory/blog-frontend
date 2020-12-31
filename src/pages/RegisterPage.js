import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../components/auth/RegisterForm';
//import AuthForm from '../components/auth/AuthForm';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      {/* <AuthForm type="register" /> */}
      <RegisterForm />
    </AuthTemplate>
  );
};

export default RegisterPage;
