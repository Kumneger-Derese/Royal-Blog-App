import { useState } from 'react';
import { toast } from 'react-toastify';
import SubscribtionImage from '../public/Subscribtion Model.png';
import { useCreateEmailMutation } from '../slices/emailApiSlice';

export default function Subscription() {
  const [subscribtionEmail, setSubscribtionEmail] = useState('');
  const [createEmail] = useCreateEmailMutation();

  //create email
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subscribtionEmail) {
      toast.error('Your email required.');
    }

    try {
      await createEmail({ subscribtionEmail }).unwrap();
      toast.success('Email Created!');
      setSubscribtionEmail('');
    } catch (error) {
      toast.error('Error ocurred in creating Email');
    }
  };

  return (
    <div className='my-16 p-16  flex flex-col md:flex-row bg-gradient-2'>
      <div className='w-full md:w-1/2 md:ml-8 mt-4'>
        <h1 className='font-bold text-5xl mb-4 text-primary'>
          Subscribe to our Newsletter.
        </h1>

        <p className='mb-16  text-slate-300'>
          Be the first to get exclusive offers and the latest news.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            value={subscribtionEmail}
            onChange={(e) => setSubscribtionEmail(e.target.value)}
            className='input input-bordered focus:border-[#f3d158] bg-transparent border-2 border-[#FEF1C0] w-5/6 block text-primary font-medium'
            placeholder='username@gmail.com'
          />

          <button
            type='submit'
            className='btn btn-md w-5/6 btn-shadow h-[48px] text-xl mt-8 bg-primary border-none font-bold'
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className='w-full md:w-1/2 flex items-center justify-center my-16 '>
        <div className='bg-primary rounded-full  '>
          <img
            src={SubscribtionImage}
            alt='SubscribtionImage'
            className='-ml-7 object-cover object-center '
          />
        </div>
      </div>
    </div>
  );
}
