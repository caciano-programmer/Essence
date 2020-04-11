import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div>
    <div>
      <div>
        <Link to="/profile">profile</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/group">group</Link>
      </div>
      <div>
        <Link to="/app">app</Link>
      </div>
    </div>
  </div>
);
