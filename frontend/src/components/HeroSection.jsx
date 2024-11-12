import Herobg from '../public/Hero banner.png';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className='flex flex-col items-center pb-12 lg:flex-row lg:gap-16 bg-gradient md:px-8 lg:px-0'>
      {/* Text Hero section */}
      <div className='lg:w-1/2 w-full grid md:place-content-center  pt-8 lg:pt-0 px-8'>
        <h2 className='tracking-widest font-bold mb-2 mt-32 md:mt-32'>
          Welcome To Royal Blog ✍{' '}
        </h2>
        <h1 className='text-4xl md:text-5xl mb-4 font-black text-primary'>
          Unleash Your <br className='md:hidden' />
          Creativity with Our <br className='md:hidden' />
          Blog Platform.
        </h1>
        <p className='text-slate-300 mt-4'>
          Share your stories, connect with readers, <br className='md:hidden' />
          and grow your online presence effortlessly.
        </p>
        <Link
          to={'/create'}
          className='btn btn-md w-[196px] h-[48px] mt-4 bg-primary border-none font-bold'
        >
          Get Started
        </Link>

        <div className='mt-16 flex flex-wrap md:flex-nowrap gap-8'>
          <div className='bg-neutral rounded-[21px] grid place-content-center w-[128px] h-[96px]'>
            <h1 className='text-2xl font-black text-[#FEF1C0]'>210K+</h1>
            <p className='font-semibold text-[#9E6407]'>Users</p>
          </div>
          <div className='bg-neutral rounded-[21px] grid place-content-center w-[128px] h-[96px]'>
            <h1 className='text-2xl font-black text-[#FEF1C0]'>130K+</h1>
            <p className='font-semibold text-[#9E6407]'>Blogs</p>
          </div>
          <div className='bg-neutral rounded-[21px] grid place-content-center w-[128px] h-[96px]'>
            <h1 className='text-2xl font-black text-[#FEF1C0]'>80K+</h1>
            <p className='font-semibold text-[#9E6407]'>Readers</p>
          </div>
        </div>
      </div>

      {/* Image Hero section */}
      <div className='w-full hidden lg:block md:px-24 px-8 sm:w-1/2 lg:px-8 pb-8'>
        <img
          src={Herobg}
          alt='Herobg'
          className='w-full object-cover object-center'
        />
      </div>
    </div>
  );
}
