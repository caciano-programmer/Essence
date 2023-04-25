/* eslint-disable @typescript-eslint/no-empty-function */
import { SetStateAction, createContext } from 'react';
import { User } from '../constants/constants';

interface UserInterface {
  user: null | User;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserInterface>({
  user: null as null | User,
  setUser: () => {},
});
