import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import CreateComment from '../Comments/CreateComment';
import UpdateComment from '../Comments/UpdateComment';
import { deleteComment, getCommentsByBlogId } from '../API/commentApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function BlogComment({ blog }) {
  const [isOpen, setIsOpen] = useState(true);

  const blogId = blog._id;

  const queryClient = useQueryClient();
  const { userInfo } = useSelector((state) => state.auth);

  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
    },
  });

  const {
    data: comment,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => getCommentsByBlogId(blogId),
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

  // delete comment
  const handleDelete = async (id) => {
    try {
      deleteCommentMutation(id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // toggle comment modal
  const toggleComment = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <CreateComment blog={blog} />

      <div className='mx-auto  w-5/6 md:w-4/6'>
        <h1 className='mt-16 text-2xl font-bold mb-6'>Comment list</h1>

        <div>
          {comment.length === 0 ? (
            <div>{`Be the first one to comment on ${blog.author.name} blog `}</div>
          ) : null}
        </div>

        {comment?.map((commentItem) => {
          return (
            <div key={commentItem._id} className='flex flex-col gap-4'>
              <div
                className={`chat w-5/6  bg-base-100 my-2 shadow-xl
                  ${
                    commentItem.postedBy.name === blog.author.name
                      ? ' chat chat-start'
                      : ' chat chat-end'
                  }
                  `}
              >
                <div
                  className={`${
                    commentItem.postedBy.name === blog.author.name
                      ? 'bg-cyan-500  '
                      : 'bg-amber-500 text-primary'
                  } card-body relative chat-bubble`}
                >
                  <div className='card-title text-sm items-center flex flex-wrap text-zinc-950 font-semibold capitalize'>
                    {commentItem.postedBy.name}
                    <span className='text-white hidden md:block'>•</span>
                    <span className='hidden md:block text-sm '>
                      {new Date(commentItem.createdAt).toDateString()}
                    </span>
                  </div>

                  <p
                    className='text-zinc-900 py-8'
                    dangerouslySetInnerHTML={{ __html: commentItem.content }}
                  ></p>

                  {commentItem.postedBy.name === userInfo.name && (
                    <div className='justify-end absolute top-4 right-4'>
                      <button
                        onClick={toggleComment}
                        className='btn btn-primary btn-sm w-16 m-2'
                      >
                        Edit
                      </button>

                      <div
                        className={`${isOpen ? 'hidden' : 'block'}
                         fixed top-4 lg:top-[5%] w-full md:top-16 md:w-[700px] md:left-[10%] md:right-32 
                         lg:right-[-30%] bottom-[10%] 
                        lg:left-[20%] left-[0%]  z-[1000]  `}
                      >
                        <div className='absolute md:right-12'>
                          <span
                            className='badge badge-primary rounded-md right-8 top-8 absolute p-4 cursor-pointer'
                            onClick={toggleComment}
                          >
                            Close
                          </span>

                          <UpdateComment comment={commentItem} />
                        </div>
                      </div>

                      <button
                        className='btn btn-primary btn-sm w-16 m-2'
                        onClick={() => handleDelete(commentItem._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
