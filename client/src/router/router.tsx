import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from 'react-router-dom';
import Header from '../components/header';
import Error from '../pages/error/error';
import Essence from '../pages/essence/essence';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Landing />} errorElement={<Error />} />
      <Route path="/Login" element={<Login />} errorElement={<Error />} />
      <Route path="/Profile" element={<Profile />} errorElement={<Error />} />
      <Route path="/Essence" element={<Essence />} errorElement={<Error />} />
    </Route>,
  ),
);

export default router;

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
