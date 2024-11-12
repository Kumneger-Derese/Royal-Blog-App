import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Loader from '../components/Loader';
import { setCredential } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../slices/usersApiSlice';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  // Login handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        throw new Error(toast.error(`Email field is required.`));
      }

      if (!password) {
        throw new Error(toast.error(`Password field is required.`));
      }

      const res = await loginUser({ email, password }).unwrap();
      dispatch(setCredential({ ...res }));
      toast.success('User Logged in.');
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='flex bg-gradient'>
      <form
        onSubmit={handleSubmit}
        className=' w-full md:w-3/5 bg-primary md:my-8 mx-auto pb-20 px-8 md:px-20'
      >
        <h1 className='mt-[96px] font-black text-2xl mb-[32px]'>
          Welcome Back!
        </h1>

        <input
          type='email'
          className='input input-bordered text-slate-900 font-medium  border-neutral focus:outline-neutral-content bg-transparent w-full mb-[32px]'
          value={email}
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          className='input input-bordered text-slate-900 font-medium  border-neutral focus:outline-neutral-content bg-transparent w-full mb-[32px]'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className='btn btn-md w-full font-bold disabled:bg-amber-950  mb-[8px] mt-[4px]'
          disabled={isLoading}
          type='submit'
        >
          {isLoading ? <Loader /> : 'Sign In'}
        </button>

        <Link to={'/register'} className='text-neutral font-senibold'>
          Don&apos;t have an account?{' '}
          <span className='text-blue-500'>Sign Up. </span>
        </Link>
      </form>
    </div>
  );
}
