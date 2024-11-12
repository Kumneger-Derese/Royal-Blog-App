import { apiSlice } from './apiSlice';

const emailApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createEmail: build.mutation({
      query: (body) => ({
        url: '/email/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Email', 'User'],
    }),
  }),
});

export const { useCreateEmailMutation } = emailApiSlice;
