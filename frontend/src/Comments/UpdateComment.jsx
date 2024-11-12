import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { updateComment } from '../API/commentApi';
import CommentEditor from './CommentEditor';

export default function UpdateComment({ comment }) {
  const [content, setContent] = useState(comment.content);

  const id = comment._id;
  const editorRef = useRef();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', id] });
    },
  });

  const handleUpdate = () => {
    try {
      mutate({ id, content });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className={` w-full mb-8 p-8 mx-auto flex flex-col bg-gradient rounded-2xl`}
      >
        <h1 className='mb-2 font-bold text-2xl'>Edit a comment</h1>
        <form onSubmit={handleUpdate} className='flex flex-col gap-8 '>
          <div className='text-slate-50 h-80 p-8 pb-24 rounded-xl bg-amber-600 overflow-y-scroll '>
            <CommentEditor
              content={content}
              setContent={setContent}
              editorRef={editorRef}
            />
          </div>

          <button className='btn btn-primary font-bold  p-2'>Update</button>
        </form>
      </div>
    </div>
  );
}
