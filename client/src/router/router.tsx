import { createBrowserRouter } from 'react-router-dom';
import Error from '../pages/error/error';
import Essence from '../pages/essence/essence';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';

// TODO implement lazy loading/prefetching
const router = createBrowserRouter([
  { element: <Landing />, path: '/', errorElement: <Error /> },
  { element: <Login />, path: '/login', errorElement: <Error /> },
  { element: <Profile />, path: '/profile', errorElement: <Error /> },
  { element: <Essence />, path: '/essence', errorElement: <Error /> },
]);

export default router;
