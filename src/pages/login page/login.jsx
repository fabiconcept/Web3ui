import React from 'react';
import FormPart from './components/form';
import SideInfo from './components/sideInfo';

const Login = () => {
  return (
    <div className="login">
      <main>
        <SideInfo />
        <FormPart />
      </main>
    </div>
  )
}

export default Login;