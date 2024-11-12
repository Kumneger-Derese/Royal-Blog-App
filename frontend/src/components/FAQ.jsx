import { faq } from '../constant/constant';
import Accordion from './Accordion';

export default function FAQ() {
  return (
    <div className='m-8 md:mx-20 lg:mx-48 my-32 '>
      <h1 className='mb-12 text-4xl font-black text-center'>
        Frequently Asked Question
      </h1>

      {/* Listing accordion */}
      <div className='flex flex-col gap-4'>
        {faq.map((faq) => (
          <Accordion key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}
