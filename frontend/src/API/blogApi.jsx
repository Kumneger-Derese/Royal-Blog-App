import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${baseURL}/api/blogs`,
});

//Todo: GET | /api/blogs/getPaginatedBlogs?page=1
const getPaginatedBlogs = async (pageNumber) => {
  try {
    const response = await api.get(`/getPaginatedBlogs?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: GET | /api/blogs/getBlogs
const getAllBlogs = async () => {
  try {
    const response = await api.get(`/getBlogs`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: GET | /api/blogs/followingBlog
const followingBlog = async () => {
  try {
    const response = await api.get(`/followingBlog`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: GET | /api/blogs/getBlog/:id
const getOneBlog = async (id) => {
  try {
    const response = await api.get(`/getBlog/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: POST | /api/blogs/create
const createBlog = async (newBlog) => {
  try {
    const response = await api.post('/create', newBlog, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

//Todo: PUT | /api/blogs/update/:id
const updateBlog = async ({ id, newBlog }) => {
  try {
    const response = await api.put(`/update/${id}`, newBlog, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: DELETE | /api/blogs/delete/:id
const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: PUT | /api/blogs/likeUnLike = optimized
const likeUnLikeBlog = async (blogId) => {
  try {
    const res = await api.put(`/likeUnlike/${blogId}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: POST | /api/blogs/search
const searchBlogs = async (query) => {
  try {
    const response = await api.post('/search', query);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: GET | /api/blogs/getBlogsByUser
const getBlogsByUser = async (id) => {
  try {
    const response = await api.get(`/getBlogsByUser/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  getPaginatedBlogs,
  getAllBlogs,
  getOneBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeUnLikeBlog,
  searchBlogs,
  getBlogsByUser,
  followingBlog,
};
