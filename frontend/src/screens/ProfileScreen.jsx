import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { setCredential } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo]);

  // Profile handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error(toast.error('Password do not match.'));
      }

      const res = await updateUser({ name, email, password }).unwrap();
      dispatch(setCredential({ ...res }));
      toast.success('Profile updated.');
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const inputElementStyle = `input input-bordered text-slate-900 font-medium  border-neutral focus:outline-neutral-content bg-transparent w-full mb-8`;

  return (
    <div className='flex bg-gradient relative'>
      <Link
        to={'/'}
        data-tip='Go to Home'
        className='absolute tooltip text-black tooltip-bottom md:text-primary text-2xl font-black top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <form
        onSubmit={handleSubmit}
        className='w-full md:w-3/5 bg-primary md:my-8 mx-auto pb-16 px-8 md:px-20'
      >
        <h1 className='mt-[96px] font-black text-2xl mb-[32px]'>
          Update Profile
        </h1>

        <input
          type='text'
          className={inputElementStyle}
          value={name}
          placeholder='Full Name'
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='email'
          className={inputElementStyle}
          value={email}
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          className={inputElementStyle}
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type='password'
          className={inputElementStyle}
          value={confirmPassword}
          placeholder='confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className='btn btn-md w-full font-bold  mb-2 mt-1'
          disabled={isLoading}
          type='submit'
        >
          {isLoading ? <Loader /> : 'Update'}
        </button>
      </form>
    </div>
  );
}
