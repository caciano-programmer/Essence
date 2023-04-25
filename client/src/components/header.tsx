import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { HEADER_HEIGHT, HEADER_WIDTH } from '../constants/constants';
import { useContext } from 'react';
import { UserContext } from '../layout/userContext';

const size = { width: HEADER_WIDTH, height: HEADER_HEIGHT };

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Box sx={size}>
      <AppBar>
        <Toolbar sx={size}>
          <Typography variant="h2" sx={{ flexGrow: 1 }}>
            <RouterLink to="/">Logo</RouterLink>
          </Typography>
          <Typography variant="h5" sx={{ mr: 4 }}>
            {user === null && <RouterLink to="/login">Login</RouterLink>}
            {user !== null && (
              <RouterLink to="/" onClick={() => setUser(null)}>
                Logout
              </RouterLink>
            )}
          </Typography>
          <Typography variant="h5" sx={{ mr: 4 }}>
            {user === null && <RouterLink to="/essence">Demo</RouterLink>}
            {user !== null && <RouterLink to="/profile">Profile</RouterLink>}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
