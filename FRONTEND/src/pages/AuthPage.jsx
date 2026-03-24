import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-lightblue border-4 border-black p-5 sm:p-8 shadow-[8px_8px_0px_#000]">
      <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button 
          onClick={() => setIsLogin(true)}
          className={`flex-1 border-4 border-black text-xl sm:text-2xl font-bold uppercase py-2 sm:py-3 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all ${isLogin ? 'bg-[#ffeb3b]' : 'bg-white'}`}
        >
          LOGIN
        </button>
        <button 
          onClick={() => setIsLogin(false)}
          className={`flex-1 border-4 border-black text-xl sm:text-2xl font-bold uppercase py-2 sm:py-3 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all ${!isLogin ? 'bg-[#ffeb3b]' : 'bg-white'}`}
        >
          REGISTER
        </button>
      </div>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
