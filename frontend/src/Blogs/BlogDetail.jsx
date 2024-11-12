import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import DetailBar from './DetailBar';
import BlogComment from './BlogComment';
import { BiArrowBack } from 'react-icons/bi';
import { deleteBlog, getOneBlog } from '../API/blogApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function BlogDetail() {
  const { id } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //* delete Blog mutation
  const { mutate } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] });
    },
  });

  //* blog query
  const {
    data: blog,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => getOneBlog(id),
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
        Error {error.message}
      </div>
    );
  }

  //* delete blog handler
  const handleDelete = (e) => {
    e.preventDefault();

    const confirmed = confirm('Are you sure you want to delete the Blog?');

    if (confirmed) {
      try {
        mutate(id, {
          onSuccess: () => {
            navigate('/blogs');
            toast.success('Blog Deleted.');
          },
        });
      } catch (error) {
        toast.error('Error in deleting blog.');
      }
    }
  };

  return (
    <main className='w-full mb-32 mx-auto relative'>
      <Link
        to={'/blogs'}
        data-tip='Go to Blogs'
        className='absolute md:block hidden tooltip tooltip-bottom text-primary text-2xl font-black -top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <div className='relative'>
        <img
          className='w-5/6 mt-16 mb-4 h-[400px] object-cover object-center mx-auto '
          src={blog.file}
          alt={blog.title}
        />

        <div className='flex gap-1 md:gap-4 mx-8 md:mx-24 mt-8 items-center'>
          <Link
            to={`/userdashbord/${blog.author._id}`}
            className=' font-bold text-sm text-[#c99b37]'
          >
            Author: {blog.author.name}
          </Link>

          <p>Created at: {new Date(blog.createdAt).toLocaleDateString()}</p>
          <p>Updated at: {new Date(blog.updatedAt).toLocaleDateString()}</p>
        </div>

        <h1 className='w-5/6 mx-auto font-bold text-3xl mt-8'>{blog.title}</h1>

        <p
          className='w-5/6 mx-auto my-8 '
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className='fixed z-[100] -bottom-12 md:right-10 my-16 w-[95%] mx-4'>
          <DetailBar blog={blog} onClick={handleDelete} id={id} />
        </div>

        <BlogComment blog={blog} key={blog._id} />
      </div>
    </main>
  );
}
