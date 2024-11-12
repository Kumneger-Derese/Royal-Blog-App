import Marquee from 'react-fast-marquee';
import {
  FaNodeJs,
  FaReact,
  FaSquareBehance,
  FaSquareDribbble,
  FaSquareFacebook,
  FaSquareGit,
  FaSquareGithub,
  FaSquareGitlab,
  FaSquareInstagram,
  FaSquareJs,
  FaSquarePinterest,
  FaSquareReddit,
  FaSquareSnapchat,
  FaSquareThreads,
  FaSquareTumblr,
  FaSquareXTwitter,
} from 'react-icons/fa6';

export default function Clients() {
  return (
    <div className='min-h-[182px] md:px-16 md:py-12'>
      <h1 className='text-4xl text-[#F5E198] px-4 md:px-0 font-bold mb-12'>
        Trusted By
      </h1>

      <Marquee speed={21} pauseOnHover pauseOnClick direction='right'>
        <div className='flex gap-12 md:gap-24'>
          <FaSquarePinterest className='text-7xl ' />
          <FaSquareTumblr className='text-7xl ' />
          <FaSquareReddit className='text-7xl ' />
          <FaSquareDribbble className='text-7xl ' />
          <FaSquareThreads className='text-7xl ' />
          <FaSquareXTwitter className='text-7xl ' />
          <FaSquareFacebook className='text-7xl ' />
          <FaSquareInstagram
            className='text-7xl '
            style={{ marginRight: '96px' }}
          />
        </div>
      </Marquee>

      <Marquee speed={21} pauseOnHover direction='left'>
        <div className='flex gap-12 md:gap-24 my-16'>
          <FaNodeJs className='text-7xl ' />
          <FaReact className='text-7xl ' />
          <FaSquareJs className='text-7xl ' />
          <FaSquareSnapchat className='text-7xl ' />
          <FaSquareGitlab className='text-7xl ' />
          <FaSquareGit className='text-7xl ' />
          <FaSquareGithub className='text-7xl ' />
          <FaSquareBehance
            className='text-7xl '
            style={{ marginRight: '96px' }}
          />
        </div>
      </Marquee>
    </div>
  );
}
