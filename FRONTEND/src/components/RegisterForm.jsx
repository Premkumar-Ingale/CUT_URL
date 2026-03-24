import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { registerUserService } from '../api/auth.api';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerUserService({ name, email, password });
      dispatch(login({ email, name }));
      navigate({ to: '/dashboard' });
    } catch (err) {
       setError(err.response?.data?.message || err.message || "REGISTRATION FAILED");
    } finally {
       setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold uppercase">&gt; IDENTIFIER:</label>
        <input 
          type="text" 
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-white border-4 border-black p-4 text-xl focus:outline-none focus:bg-[#ffeb3b] shadow-inner"
          placeholder="USERNAME"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold uppercase">&gt; EMAIL:</label>
        <input 
          type="email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-white border-4 border-black p-4 text-xl focus:outline-none focus:bg-[#ffeb3b] shadow-inner"
          placeholder="USER@EXAMPLE.COM"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-2xl font-bold uppercase">&gt; PASSWORD:</label>
        <input 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="bg-white border-4 border-black p-4 text-xl focus:outline-none focus:bg-[#ffeb3b] shadow-inner"
          placeholder="********"
        />
      </div>
      <button 
        type="submit"
        className="bg-darkpurple text-white border-4 border-black py-4 text-2xl font-bold uppercase shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:bg-[#8679b3] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none mt-4 transition-all"
      >
        INITIALIZE USER
      </button>
    </form>
  );
};

export default RegisterForm;
