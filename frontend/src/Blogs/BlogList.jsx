import { useState } from 'react';
import BlogCard from './BlogCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { getPaginatedBlogs, searchBlogs } from '../API/blogApi';
import { HiOutlineHome, HiPlusCircle, HiXMark } from 'react-icons/hi2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function BlogList() {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const queryClient = useQueryClient();

  // search mutation
  const { mutate, data: searchData } = useMutation({
    mutationFn: searchBlogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs', search] });
    },
  });

  // paginated blog
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['blogs', pageNumber],
    queryFn: () => getPaginatedBlogs(pageNumber),
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

  // paginated blog data destructure.
  const { blogs, currentPage, numberOfPages } = data;

  // Next page
  const handleNextPage = (e) => {
    e.preventDefault();

    if (Number(currentPage) < Number(numberOfPages)) {
      setPageNumber(Number(currentPage) + 1);
    } else if (Number(currentPage) === Number(numberOfPages)) {
      toast.success('The last page.');
    }
  };

  // Previous page
  const handlePreviousPage = (e) => {
    e.preventDefault();

    if (Number(currentPage) === 1) {
      toast.success('The first page cannot go back.');
    } else {
      setPageNumber(Number(currentPage) - 1);
    }
  };

  // toggle search modal
  const toggleModal = () => {
    setModal(!modal);
  };

  //search handler
  const handleSearch = (query) => {
    try {
      setSearch(query);
      mutate({ query });
    } catch (error) {
      toast.error('Error in searching');
    }
  };

  return (
    <div className='bg-neutral pb-8  flex flex-col relative'>
      <div className='mb-16 sticky top-4 h-16 z-[100] bg-[#7F5005] rounded-xl flex items-center md:justify-center justify-between w-full  md:w-[500px] lg:w-[800px]  mx-auto'>
        <Link to={'/'} className='m-4 text-primary text-3xl mr-8'>
          <HiOutlineHome size={32} color='#F59E0B' />
        </Link>

        <div className='flex items-center'>
          <input
            type='search'
            placeholder='Search blogs'
            onChange={(e) => handleSearch(e.target.value)}
            onClick={toggleModal}
            className='input input-bordered  placeholder:text-[#f8c36e] lg:focus:w-[600px] duration-300 border-[#c08a33] focus:border-[#f0ae44] font-bold w-full md:w-[300px] lg:w-[500px] bg-transparent'
          />
        </div>

        <Link to={'/create'} className='m-4 text-primary text-3xl mr-8'>
          <HiPlusCircle size={36} color='#F59E0B' />
        </Link>

        {modal && (
          <div className='w-full fixed top-0 bottom-0 right-0 left-0 text-neutral'>
            <div
              className='w-full fixed top-0 bottom-0 right-0 left-0'
              onClick={toggleModal}
            />

            <div className='bg-[#f0ae44] absolute w-[90vw] md:w-[450px] lg-w-[700px] font-medium top-[50%] rounded px-8 left-[50%] h-[60vh] transform -translate-x-[50%] -translate-y-[50%] '>
              <h1 className='font-bold text-2xl py-8'>Search result</h1>

              <div className='flex flex-col gap-2 max-h-[40vh] overflow-y-scroll'>
                {searchData?.map((item) => (
                  <Link to={`/blog/${item._id}`} key={item._id}>
                    {item.title}
                  </Link>
                ))}
              </div>

              <button
                onClick={toggleModal}
                className='absolute top-8 font-black right-8 btn btn-sm btn-square '
              >
                <HiXMark className='text-2xl font-extrabold' />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Blog List */}
      <section className='grid grid-cols-1 pt-8 md:pt-0 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto'>
        {blogs?.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </section>

      {/* Pagination Button */}
      <div className='w-96 mx-auto mt-32'>
        <div className='flex gap-8'>
          <button
            className='btn btn-neutral text-primary w-[7rem] font-bold'
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <button
            className='btn btn-neutral text-primary w-[7rem]  font-bold'
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>

        <p className='font-bold mt-4 ml-2 text-left'>{`${currentPage} of ${numberOfPages} pages `}</p>
      </div>
    </div>
  );
}
