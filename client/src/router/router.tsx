import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Error from '../pages/error/error';
import Essence from '../pages/essence/essence';
import Landing from '../pages/landing/landing';
import Login from '../pages/login/login';
import Profile from '../pages/profile/profile';
import Layout from '../layout/layout';

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
