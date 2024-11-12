import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import CommentEditor from './CommentEditor';
import { createComment } from '../API/commentApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function CreateComment({ blog }) {
  const [content, setContent] = useState('');

  const editorRef = useRef(null);
  const blogId = blog._id;

  const { userInfo } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
    },
  });

  // handle create comment
  const handleSubmit = async () => {
    try {
      mutate({ blogId, content });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className={` w-5/6 md:w-4/6 mb-8 mx-auto flex flex-col mt-32`}>
        <h1 className='mb-8 font-bold text-4xl'>Leave a comment</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-1'>
          <div className='bg-amber-600 rounded-md  text-slate-50 p-2 md:p-8'>
            <CommentEditor
              content={content}
              setContent={setContent}
              editorRef={editorRef}
              placeholder={`Hey ${userInfo.name} comment on ${blog.author.name} blogs`}
            />
          </div>
          <button className='btn btn-primary mt-12 md:mt-16'>Post</button>
        </form>
      </div>
    </div>
  );
}
