import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { deleteBlog, getBlogsByUser } from '../API/blogApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function UserDashboard() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { userInfo } = useSelector((state) => state.auth);

  // delete blog
  const { mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] });
    },
  });

  // get blog by userId
  const {
    data: blogByUser,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => getBlogsByUser(id),
  });

  if (isPending) {
    return (
      <div className='m-64 grid grid-cols-1 place-content-center font-bold text-7xl text-green-600'>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='m-64 font-bold text-4xl text-red-600'>
        Error {error.message}
      </div>
    );
  }

  // blog delete handler
  const handleDelete = (id) => {
    const confirmed = confirm('Are you sure you want to delete');
    if (confirmed) {
      try {
        mutate(id, {
          onSuccess: () => {
            toast.success('Blog Deleted.');
          },
        });
      } catch (error) {
        toast.error('Error in deleting blog.');
      }
    }
  };

  return (
    <div className='mx-8 pt-8 md:mx-16 lg:mx-24 min-h-screen'>
      <Link
        to={'/blogs'}
        data-tip='Go to Blogs'
        className='absolute tooltip tooltip-bottom text-primary text-2xl font-black top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <div className='card my-8'>
        <section className='bg-gradient-to-br from-amber-400 to-amber-900 text-slate-950 flex space-x-4 my-8 rounded-sm'>
          {blogByUser?.slice(0, 1).map((user) => {
            return (
              <div
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-x-8 p-4 relative'
                key={user._id}
              >
                <p className='text-2xl  font-semibold absolute left-0 -top-7 px-4 bg-orange-500 rounded-sm'>
                  {user.author.name}
                </p>

                <p className='font-medium'>{blogByUser.length} posts</p>

                <p className='font-medium'>
                  followers : {user.author.followers.length}
                </p>

                <p className='font-medium'>
                  following : {user.author.following.length}
                </p>
              </div>
            );
          })}
        </section>
      </div>

      <section className='flex flex-col'>
        <h1 className='mb-8 font-bold text-3xl to-amber-200'>Blogs</h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-base-100 gap-4 sm:gap-8 lg:gap-16 space-x-4 items-center justify-center'>
          {blogByUser?.map((blog) => (
            <div
              key={blog._id}
              className='card bg-base-200 card-bordered min-w-72 h-72'
            >
              <figure className='h-56'>
                <Link to={`/blog/${blog._id}`}>
                  <img
                    src={blog.file}
                    alt={blog.title}
                    className='min-h-56 min-w-full object-cover object-center'
                  />
                </Link>
              </figure>
              <div className='flex space-x-4 my-2 font-medium px-[16px]'>
                <small>{blog.likes.length} likes </small>
                <small>
                  Created at: {new Date(blog.createdAt).toLocaleDateString()}
                </small>
              </div>

              <div className='card-body px-[16px] py-2 mb-8 my-0'>
                <Link to={`/blog/${blog._id}`} className='card-title'>
                  {blog.title}
                </Link>
              </div>

              {userInfo.email === blog.author.email && (
                <button
                  className='font-black my-0 w-16 mb-4 mx-[16px] btn btn-sm bg-red-900 text-red-300'
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
