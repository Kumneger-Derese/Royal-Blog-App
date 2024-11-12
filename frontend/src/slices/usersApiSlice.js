import { apiSlice } from './apiSlice';

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    //Todo: register user
    registerUser: build.mutation({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    //Todo: login user
    loginUser: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    //Todo: logout user
    logoutUser: build.mutation({
      query: () => ({
        url: '/users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    //Todo: get user
    getUser: build.query({
      query: () => ({ url: `/users/profile` }),
      providesTags: ['User'],
    }),

    //Todo: update user
    updateUser: build.mutation({
      query: (body) => ({
        url: '/users/profile',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    //Todo: followUnfollow user | api/users/followUnfollow
    followUnfollowUser: build.mutation({
      query: (followId) => ({
        url: `/users/followUnfollow`,
        method: 'POST',
        body: followId,
      }),

      invalidatesTags: (result, error, followId) => [
        { type: 'User', id: followId },
      ],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useFollowUnfollowUserMutation,
} = usersApiSlice;
