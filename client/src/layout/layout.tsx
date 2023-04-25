import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import { useState } from 'react';
import { User } from '../constants/constants';
import { UserContext } from './userContext';

export default function Layout() {
  const [user, setUser] = useState(null as null | User);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Outlet />
    </UserContext.Provider>
  );
}
