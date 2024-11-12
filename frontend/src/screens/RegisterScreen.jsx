import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../slices/usersApiSlice';
import { setCredential } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  // register handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name) {
        throw new Error(toast.error(`Name field is required.`));
      }
      if (!email) {
        throw new Error(toast.error(`Email field is required.`));
      }
      if (!password) {
        throw new Error(toast.error(`Password field is required.`));
      }
      if (!isChecked) {
        throw new Error(toast.error('Agree to Privacy policy.'));
      }

      const res = await registerUser({ name, email, password }).unwrap();
      dispatch(setCredential({ ...res }));
      toast.success('User Registered');
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const inputStyle = `input input-bordered text-slate-900 font-medium  border-neutral focus:outline-neutral-content bg-transparent w-full mb-8`;

  return (
    <div className=' flex bg-gradient shadow'>
      <form
        onSubmit={handleSubmit}
        className='w-full md:w-3/5 mx-auto bg-primary px-8  md:my-8 pb-12 md:px-20'
      >
        <h1 className='mt-[72px] font-black text-2xl mb-8'>Create Account</h1>

        <input
          type='text'
          className={inputStyle}
          value={name}
          placeholder='Full Name'
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='email'
          value={email}
          placeholder='Email Address'
          className={inputStyle}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          value={password}
          placeholder='Password'
          className={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='flex mb-4'>
          <input
            type='checkbox'
            value={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className='checkbox mr-2 border-2 border-neutral/70 focus:border-none'
          />

          <span className='text-sm font-medium'>
            I agree to the terms of services and privacy policy
          </span>
        </div>

        <button
          className='btn btn-md w-full disabled:bg-amber-950 font-bold  mb-2 mt-1'
          disabled={isLoading}
          type='submit'
        >
          {isLoading ? <Loader /> : 'Sign Up'}
        </button>

        <Link to={'/login'} className='text-neutral font-semibold'>
          Already have an account?{' '}
          <span className='text-blue-500'>Sign In. </span>
        </Link>
      </form>
    </div>
  );
}
