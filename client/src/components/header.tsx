import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const HEADER_SIZE = { width: '100vw', height: '10vh' };

function Header() {
  return (
    <Box sx={HEADER_SIZE}>
      <AppBar>
        <Toolbar sx={HEADER_SIZE}>
          <Typography variant="h4">Logo</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
