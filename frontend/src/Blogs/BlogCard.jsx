import { HiBookOpen } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div
      key={blog._id}
      className='card card-compact w-80 bg-gradient shadow-xl hover:border hover:border-amber-400 hover:rounded-b-none'
    >
      <figure>
        <Link to={`/blog/${blog._id}`} className='w-full h-full'>
          <img
            src={blog.file}
            alt={blog.title}
            className='max-h-48 min-w-full object-cover object-center'
          />
        </Link>
      </figure>
      <div className='card-body bg-base-100'>
        <h2 className='card-title'>{blog.title}</h2>
        <p
          className='line-clamp-6'
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></p>

        <div className='card-actions justify-end'>
          <Link
            className='flex items-center p-2 text-[#f8f080] font-semibold'
            to={`/blog/${blog._id}`}
          >
            <HiBookOpen className='text-xl rounded-full space-x-4' /> More
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BlogCard;
