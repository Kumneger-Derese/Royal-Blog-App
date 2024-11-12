import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-8 md:ml-8 gap-1 min-h-96 pt-16 footer'>
      <div className='w-full md:w-1/4  grid place-content-center'>
        <Link to={'/'} className='text-4xl font-bold'>
          Royal Blog
        </Link>
        <p className=' text-base tracking-widest mb-2'>@2024</p>
      </div>

      <div className='w-full mx-32 md:w-1/4  '>
        <h1 className='text-3xl mb-4 text-primary font-bold'>Learn</h1>
        <p className=' text-base '>Tutorials</p>
        <p className=' text-base '>Design</p>
        <p className=' text-base '>Project Based</p>
        <p className=' text-base '>Code</p>
        <p className=' text-base '>React.js</p>
        <p className=' text-base '>Html/Css</p>
        <p className=' text-base '>UI/Ux</p>
      </div>

      <div className='w-full mx-32 md:w-1/4  '>
        <h1 className='text-3xl mb-4 text-primary font-bold'>Company</h1>
        <p className=' text-base '>About</p>
        <p className=' text-base '>Careers</p>
        <p className=' text-base '>Code of Conduct</p>
        <p className=' text-base '>Help</p>
        <p className=' text-base '>Contact us</p>
      </div>

      <div className='w-full mx-32 md:w-1/4 pb-12 md:pb-0 '>
        <h1 className='text-3xl mb-4 text-primary font-bold'>Follow</h1>
        <p className=' text-base '>Facebook</p>
        <p className=' text-base '>Medium</p>
        <p className=' text-base '>Youtube</p>
        <p className=' text-base '>Instagram</p>
        <p className=' text-base '>X</p>
      </div>
    </div>
  );
}
