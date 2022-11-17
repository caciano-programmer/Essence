import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { HEADER_HEIGHT, HEADER_WIDTH } from '../constants/constants';

const size = { width: HEADER_WIDTH, height: HEADER_HEIGHT };

function Header() {
  return (
    <Box sx={size}>
      <AppBar>
        <Toolbar sx={size}>
          <Typography variant="h2" sx={{ flexGrow: 1 }}>
            Logo
          </Typography>
          <Typography variant="h5" sx={{ mr: 4 }}>
            <Link to="/login">Login</Link>
          </Typography>
          <Typography variant="h5" sx={{ mr: 4 }}>
            <Link to="/essence">Demo</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
