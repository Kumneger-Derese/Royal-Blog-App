import { Link } from 'react-router-dom';

export default function Explore() {
  return (
    <div className=' flex flex-col lg:flex-row lg:gap-4 px-16 py-16'>
      <div className='w-full lg:w-1/2  grid place-content-center mt-8'>
        <h1 className='text-5xl font-bold mb-4'>
          Blog with very quality and Guaranteed articles
        </h1>
        <p className='text-accent-content'>
          A place to search for articles and blogs that are very accurate and
          very reliable. with more than 17 years serving you all.
        </p>
        <Link
          to={'/blogs'}
          className='btn btn-md w-[196px] h-[48px] mt-8 bg-primary border-none font-bold'
        >
          Explore now
        </Link>
      </div>

      <div className='w-full mx-2 mt-24 lg:w-1/2 grid place-content-center gap-4 lg:gap-6 '>
        <div
          className='text-primary  border-2 rounded-sm bg-[#9A6414] pl-8 
         w-full lg:w-[448px] pr-2 py-4  border-[#D1AF28]'
        >
          <h1 className='text-xl font-bold mb-2'>Trusted articles</h1>
          <p className='text-[#FEF1C0]'>
            Very safe and trusted articles from experienced tech expert
            bloggers.
          </p>
        </div>
        <div className='text-primary  border-2 rounded-sm bg-[#9A6414] pl-8 w-full lg:w-[448px] pr-2 py-4  border-[#D1AF28]'>
          <h1 className='text-xl font-bold mb-2'>Creative blog writer</h1>
          <p className='text-[#FEF1C0]'>
            A very creative and innovative from all fields technology and
            related.{' '}
          </p>
        </div>
        <div className='text-primary  border-2 rounded-sm bg-[#9A6414] pl-8 w-full lg:w-[448px] pr-2 py-4  border-[#D1AF28]'>
          <h1 className='text-xl font-bold mb-2'>
            Guaranteed safe, High quality
          </h1>
          <p className='text-[#FEF1C0]'>
            Comfortable and safe with Royal Blog and has been trusted a very
            long time.
          </p>
        </div>
      </div>
    </div>
  );
}
