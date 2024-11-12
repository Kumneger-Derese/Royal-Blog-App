export default function Features() {
  return (
    <div
      className='flex flex-col sm:mx-8  md:flex-row 
     gap-4 p-16 md:my:12 '
    >
      <div className='bg-[#9E6407] p-4 max-w-96  rounded-md'>
        <h1 className='mb-4 font-bold text-primary text-xl'>
          Industry News and Updates
        </h1>
        <p className='font-medium text-sm text-[#FEF1C0]'>
          Stay informed with the latest news and updates in web technologies and
          software development. Our blog features articles on emerging trends,
          industry insights and major announcements.Provide the knowledge and
          tools you need to succeed.
        </p>
      </div>

      <div className='bg-[#9E6407] p-4 max-w-96  rounded-md'>
        <h1 className='mb-4 font-bold text-primary text-xl'>
          In-Depth Tutorials
        </h1>
        <p className='font-medium text-sm text-[#FEF1C0]'>
          Dive into comprehensive tutorials covering the latest in web
          technology whether you are learning a new programming language,
          exploring new framework or enhancing your coding skills our step by
          step guides provide the knowledge and tools you need to succeed.
        </p>
      </div>
      <div className='bg-[#9E6407] p-4 max-w-96  rounded-md '>
        <h1 className='mb-4 font-bold text-primary text-xl'>
          Personalized content Recommendation
        </h1>
        <p className='font-medium text-sm text-[#FEF1C0]'>
          Discover content tailored to your interests and skill level with our
          personalized recommendation engine. Based on your reading history and
          preferences, we suggest articles and tutorials that match your
          interest.
        </p>
      </div>
    </div>
  );
}
