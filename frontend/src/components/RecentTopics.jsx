import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllBlogs } from '../API/blogApi';
import Loader from './Loader';

export default function RecentTopics() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });

  if (isPending) {
    return (
      <div className='m-64 font-bold text-4xl text-green-600'>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className='m-64 font-bold text-4xl text-red-600'>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className='flex flex-col mx-4 md:mx-12 my-40 items-center'>
      <h1 className='font-bold text-4xl mb-16'>Recent Topics</h1>

      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {data?.map((blog) => (
          <div
            key={blog._id}
            className='min-w-[340px] box-shadow-gold bg-primary p-4 rounded-md  '
          >
            <h1 className='text-[#9A6414] line-clamp-1 font-bold text-xl mb-4'>
              {blog.title}
            </h1>
            <p
              className='text-black line-clamp-4'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></p>

            <Link
              to={`/blog/${blog._id}`}
              className='btn btn-neutral w-[104px] mt-2'
            >
              More
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
