import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { followingBlog } from '../API/blogApi';
import { useQuery } from '@tanstack/react-query';

export default function FollowingBlog() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: followingBlog,
  });

  if (isPending) {
    return (
      <div className='m-64 font-bold text-4xl text-green-600 loading loading-bars'>
        Loading...
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
    <div className={`mx-6  text-primary`}>
      <Link
        to={'/blogs'}
        data-tip='Go to BlogList'
        className='absolute tooltip  tooltip-bottom text-primary text-2xl font-black top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <h1 className='font-black sm:text-4xl my-12 text-center'>
        FollowingBlog
      </h1>

      <div className=' grid gap-3 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full'>
        {data.map((followingBlog) => (
          <div
            key={followingBlog._id}
            className='card w-90 bg-gray-900 shadow-xl'
          >
            <div className='card-body'>
              <h2 className='card-title line-clamp-2 text-neutral-content font-bold'>
                <span className='pr-4'>{followingBlog.title}</span>
                <span
                  className='bg-amber-700 badge text-amber-200 border-amber-300 border-2
                 p-3 rounded-md'
                >
                  {` By ${followingBlog.author.name}`}
                </span>
              </h2>

              <p
                className='line-clamp-6 my-4'
                dangerouslySetInnerHTML={{ __html: followingBlog.content }}
              ></p>

              <div className='card-actions '>
                <Link
                  to={`/blog/${followingBlog._id}`}
                  className='btn btn-primary'
                >
                  More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
