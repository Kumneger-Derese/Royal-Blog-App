import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='overflow-hidden'>
      <Outlet />
      <Footer />
      <ToastContainer position='top-right' pauseOnFocusLoss={false} />
    </div>
  );
}
