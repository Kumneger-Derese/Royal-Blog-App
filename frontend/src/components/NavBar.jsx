import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLogoutUserMutation } from '../slices/usersApiSlice.js';
import { toast } from 'react-toastify';
import { clearCredential } from '../slices/authSlice.js';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { useState } from 'react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await logoutUser().unwrap();
      dispatch(clearCredential());
      toast.success(res);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className='h-14 bg-primary font-bold capitalize w-full md:w-[95%] fixed top-2 z-50 flex justify-between items-center md:mx-8   px-8 rounded-md'>
      <section>
        <Link className='text-amber-500 font-black text-xl' to={'/'}>
          Royal Blog
        </Link>
      </section>

      <div className='hidden md:block'>
        {userInfo ? (
          <section className='flex gap-4'>
            <Link to={'/blogs'}>Posts</Link>
            <Link to={'/create'}>Create</Link>
            <Link to={'/following'}>Following</Link>
          </section>
        ) : (
          <section className='flex gap-4'>
            <Link to={'/login'}>Login</Link>
          </section>
        )}
      </div>

      {userInfo && (
        <section className='relative '>
          <HiBars3BottomRight
            onClick={() => setIsOpen(!isOpen)}
            className='font-black text-3xl '
          />

          {isOpen ? (
            <div className='absolute flex flex-col gap-y-1 justify-center bg-primary rounded px-8 py-4 -left-24 top-12'>
              <Link to={'/profile'}>Profile</Link>
              <button onClick={handleLogout} className='-ml-6'>
                Logout
              </button>
              <Link to={`/userdashbord/${userInfo._id}`}>Dashboard</Link>

              <div className={`md:hidden flex flex-col`}>
                <Link to={'/blogs'}>Posts</Link>
                <Link to={'/create'}>Create</Link>
                <Link to={'/following'}>Following</Link>
              </div>
            </div>
          ) : (
            ''
          )}
        </section>
      )}
    </div>
  );
}
