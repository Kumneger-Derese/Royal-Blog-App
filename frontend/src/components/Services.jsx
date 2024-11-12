import { Link } from 'react-router-dom';
import serviceImage from '../public/Blogger.png';

export default function Services() {
  return (
    <div className='flex flex-col md:flex-row mx-8 md:mx-16 my-12 lg:my-32 '>
      <div className=' md:w-2/5 bg-primary mt-16 mb-16 md:my-16 md:mx-20 mr-0 md:-mr-16 z-10 rounded-md relative'>
        <img
          src={serviceImage}
          alt='serviceImage'
          className='object-cover object-center'
        />
        <div className='badge badge-neutral rounded p-4 font-bold absolute top-16 right-12'>
          Learn
        </div>
        <div className='badge badge-neutral rounded p-4 font-bold absolute top-40 left-12'>
          Read
        </div>
        <div className='badge badge-neutral rounded p-4 font-bold absolute bottom-16 right-12'>
          Practice
        </div>
      </div>

      <div className='w-full md:w-3/5 bg-gradient-2 p-4 pl-8 md:pl-40 lg:pt-32'>
        <h3 className='font-semibold mb-4 text-[#f1ef68] tracking-widest'>
          Services
        </h3>
        <h1 className='text-primary text-4xl font-bold'>
          Information is a source of life that has no limit.
        </h1>
        <p className='text-slate-300 mt-6 antialiased'>
          Read blogs regularly so that your knowledge will increase and become
          nerd person in technology and make you informed software developer.
        </p>
        <Link
          to={'/blogs'}
          className='btn btn-md w-[196px] h-[48px] mt-8 bg-primary border-none font-bold'
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
