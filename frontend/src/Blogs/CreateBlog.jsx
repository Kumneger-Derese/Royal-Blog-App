import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { createBlog } from '../API/blogApi';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import BlogEditor from './BlogEditor';
import { BiArrowBack } from 'react-icons/bi';
import Loader from '../components/Loader';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editorRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error('Please title field required.');
    }

    if (!content) {
      toast.error('Please content field required.');
    }

    if (!image) {
      toast.error('Please image field required.');
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      mutate(formData, {
        onSuccess: () => {
          toast.success('Blog created');
          navigate('/blogs');
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='relative'>
      <Link
        to={'/'}
        data-tip='Go to Home'
        className='absolute tooltip tooltip-bottom text-primary text-2xl font-black top-8 left-16'
      >
        <BiArrowBack />
      </Link>

      <h1 className='my-16 text-3xl font-bold text-center'>Create Blog</h1>

      <form
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        className='w-4/6 mx-auto'
      >
        <input
          type='text'
          className='input input-bordered w-full mb-4'
          placeholder='Title'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type='file'
          name='image'
          accept='image/*'
          className='input-file text-white input-file-bordered border border-neutral-content/20 rounded-md p-2 w-full mb-4'
          placeholder='Image'
          onChange={(e) => setImage(e.target.files[0])}
        />

        <BlogEditor
          editorRef={editorRef}
          content={content}
          setContent={setContent}
        />

        <button className='btn btn-md mt-24 w-full' type='submit'>
          {isPending ? <Loader /> : ' Submit'}
        </button>
      </form>
    </div>
  );
}
