import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to={'/login'} />;
}
