import axios from 'axios';

axios.defaults.withCredentials = true;
const baseURL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${baseURL}/api/comments`,
});

//Todo: get comment by commentId

const getCommentsByBlogId = async (blogId) => {
  try {
    const response = await api.get(`/getCommentsByBlogId/${blogId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: create comment
const createComment = async (newComment) => {
  try {
    const response = await api.post('/createComment', newComment);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: update comment
const updateComment = async (newComment) => {
  try {
    const response = await api.put(
      `/updateComment/${newComment.id}`,
      newComment
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//Todo: delete comment
const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/deleteComment/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { getCommentsByBlogId, createComment, updateComment, deleteComment };
