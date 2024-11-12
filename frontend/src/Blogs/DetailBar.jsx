/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  HiMiniPencilSquare,
  HiMiniTrash,
  HiOutlineHomeModern,
  HiPlusCircle,
  HiRectangleGroup,
} from 'react-icons/hi2';

import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { likeUnLikeBlog } from '../API/blogApi';
import { toast } from 'react-toastify';

import { useFollowUnfollowUserMutation } from '../slices/usersApiSlice';

export default function DetailBar({ id, blog, onClick }) {
  const { userInfo } = useSelector((state) => state.auth);

  const blogId = id;

  const queryClient = useQueryClient();

  const [followUnfollowUser] = useFollowUnfollowUserMutation();

  // likeUnLike Blog mutation
  const { mutate: likeUnlikeMutate } = useMutation({
    mutationFn: likeUnLikeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', id] });
    },
  });

  // likeUnlike Blog handler
  const handleLikeUnlike = async (e) => {
    e.preventDefault();
    try {
      likeUnlikeMutate(blogId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Todo: FollowUnFollow user

  const handleFollowUnfollow = async () => {
    try {
      const res = await followUnfollowUser({
        followId: blog.author._id,
      }).unwrap();

      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='p-4 mx-auto font-black flex flex-wrap md:flex-nowrap justify-between w-full md:w-3/6 md:px-8 items-center rounded-3xl text-primary bg-[#c5942a]'>
      {/* Link to home */}
      <Link to={'/'} className='tooltip' data-tip='Home'>
        <HiOutlineHomeModern className='duration-700 hover:text-primary inline-block text-2xl text-neutral' />
      </Link>

      {/* Link to blogs */}
      <Link to={'/blogs'} className='tooltip' data-tip='BlogList'>
        <HiRectangleGroup className='duration-700 hover:text-primary inline-block text-2xl text-neutral' />
      </Link>

      {/* Link to create blogs */}
      <Link to={'/create'} className='tooltip' data-tip='Create'>
        <HiPlusCircle className='duration-700 hover:text-primary inline-block text-2xl text-neutral' />
      </Link>

      {/* Like unlike blogs */}
      {!(userInfo.email === blog.author.email) && (
        <div>
          {blog.likes.includes(userInfo._id) ? (
            <button
              onClick={handleLikeUnlike}
              className='tooltip'
              data-tip='Unlike'
            >
              <FaHeart className=' duration-700 inline-block hover:text-primary text-2xl text-neutral' />
            </button>
          ) : (
            <button
              onClick={handleLikeUnlike}
              className='tooltip'
              data-tip='Like'
            >
              <FaRegHeart className=' duration-700 inline-block text-2xl hover:text-primary text-neutral' />
            </button>
          )}
        </div>
      )}

      {/* Like count */}
      <p
        className={`duration-700 inline-block text-lg font-normal hover:text-primary text-neutral `}
      >
        {blog.likes.length} likes
      </p>

      {/* Follow Unfollow */}

      {userInfo.email !== blog.author.email && (
        <button
          className='duration-700 text-neutral hover:text-primary '
          onClick={handleFollowUnfollow}
        >
          {blog.author.followers.includes(userInfo._id) ? (
            <RiUserUnfollowFill
              className='tooltip duration-700 hover:text-primary inline-block text-2xl text-neutral'
              data-tip='Unfollow'
            />
          ) : (
            <RiUserFollowFill
              className='tooltip inline-block text-2xl text-neutral'
              data-tip='follow'
            />
          )}
        </button>
      )}

      {/* If user is the creator he/she can delete and update */}

      {userInfo.email === blog.author.email && (
        <div className='duration-700 flex justify-between gap-8'>
          <Link
            to={`/update/${blog._id}`}
            className='tooltip'
            data-tip='Update'
          >
            <HiMiniPencilSquare className='inline-block hover:text-primary text-2xl text-neutral duration-700 ' />
          </Link>

          <button onClick={onClick} className='tooltip' data-tip='Delete'>
            <HiMiniTrash className=' duration-700 inline-block hover:text-primary text-2xl text-neutral' />
          </button>
        </div>
      )}
    </div>
  );
}
