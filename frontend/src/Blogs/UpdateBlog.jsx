import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getOneBlog, updateBlog } from '../API/blogApi';
import { useRef } from 'react';
import BlogEditor from './BlogEditor';
import { BiArrowBack } from 'react-icons/bi';

// Placeholder data
const usePlaceHolder = (id) => {
  const { data } = useQuery({
    queryKey: ['blogs', id],
    queryFn: (id) => getOneBlog(id),
  });

  return { data };
};

export default function UpdateBlog() {
  const { id } = useParams();

  const editorRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // old blog data
  const { data } = usePlaceHolder(id);

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [image, setImage] = useState(data.file);

  // update blog
  const { mutate, isPending } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // blog updater
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      mutate(
        { id, newBlog: formData },
        {
          onSuccess: () => {
            toast.success('Blog Updated');
            navigate('/blogs');
          },
        }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='relative'>
      <Link
        to={`/blog/${id}`}
        data-tip='Go to BlogList'
        className='absolute tooltip tooltip-bottom text-primary text-2xl font-black top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <h1 className='my-16 text-3xl font-bold text-center'>Update Blog</h1>

      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='w-4/6 mx-auto'
      >
        <input
          type='text'
          name='title'
          className='input input-bordered w-full mb-4'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='flex gap-x-4'>
          <input
            type='file'
            name='image'
            accept='image/*'
            className='input-file text-white input-file-bordered border border-neutral-content/20 rounded-md p-2 w-full mb-4'
            onChange={(e) => setImage(e.target.files[0])}
          />

          <img
            src={`http://localhost:8000/public/${image}`}
            className='h-12 w-12'
            alt='img'
          />
        </div>

        <BlogEditor
          editorRef={editorRef}
          content={content}
          setContent={setContent}
        />

        <button
          className='btn btn-md w-full mt-24 text-neutral-content font-bold disabled:bg-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed'
          type='submit'
          disabled={isPending}
        >
          {isPending ? <Loader /> : 'Update'}
        </button>
      </form>
    </div>
  );
}
