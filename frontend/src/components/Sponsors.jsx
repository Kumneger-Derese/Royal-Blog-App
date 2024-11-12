import Marquee from 'react-fast-marquee';
import {
  FaSquareDribbble,
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquarePinterest,
  FaSquareReddit,
  FaSquareThreads,
  FaSquareTumblr,
  FaSquareXTwitter,
} from 'react-icons/fa6';

export default function Sponsors() {
  return (
    <div className='h-[182px] px-16 py-4 mb-32 transform rotate-1'>
      <Marquee speed={50} pauseOnHover direction='left'>
        <div className='flex gap-24'>
          <FaSquarePinterest size={100} />
          <FaSquareTumblr size={100} />
          <FaSquareReddit size={100} />
          <FaSquareDribbble size={100} />
          <FaSquareThreads size={100} />
          <FaSquareXTwitter size={100} />
          <FaSquareFacebook size={100} />
          <FaSquareInstagram size={100} style={{ marginRight: '96px' }} />
        </div>
      </Marquee>
    </div>
  );
}
