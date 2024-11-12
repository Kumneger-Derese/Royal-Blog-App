import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { Provider } from 'react-redux';
import { store } from './store.js';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import BlogList from './Blogs/BlogList.jsx';
import UpdateBlog from './Blogs/UpdateBlog.jsx';
import BlogDetail from './Blogs/BlogDetail.jsx';
import CreateBlog from './Blogs/CreateBlog.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import UserDashbord from './Blogs/UserDashbord.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import FollowingBlog from './Blogs/FollowingBlog.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Tanstack query config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
    },
    mutations: {
      networkMode: 'offlineFirst',
    },
  },
});

// react router 6 setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorPage />}>
      <Route index={true} path='/' element={<HomeScreen />}></Route>
      <Route path='/register' element={<RegisterScreen />}></Route>
      <Route path='/login' element={<LoginScreen />}></Route>

      <Route path='' element={<ProtectedRoute />}>
        <Route path='/profile' element={<ProfileScreen />}></Route>
        <Route path='/blogs' element={<BlogList />}></Route>
        <Route path='/blog/:id' element={<BlogDetail />}></Route>
        <Route path='/update/:id' element={<UpdateBlog />}></Route>
        <Route path='/userdashbord/:id' element={<UserDashbord />}></Route>
        <Route path='/create' element={<CreateBlog />}></Route>
        <Route path='/following' element={<FollowingBlog />}></Route>
      </Route>
    </Route>
  )
);

// root app and global state
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider
      client={queryClient}
      future={{
        v7_startTransition: true,
      }}
    >
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);
