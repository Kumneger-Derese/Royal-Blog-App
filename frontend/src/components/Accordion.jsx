export default function Accordion({ faq }) {
  return (
    <div>
      <div className='collapse collapse-plus p-2 bg-base-200'>
        <input type='radio' name={`home-accordion`} />

        <div className='collapse-title text-xl md:text-2xl  font-medium tracking-tighter '>
          {faq.question}
        </div>

        <div className='collapse-content  text-neutral-content/75'>
          <p className='my-8 text-left'>{faq.content}</p>
        </div>
      </div>
    </div>
  );
}
