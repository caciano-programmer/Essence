import { Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import Header from '../components/header';
import router from '../router/router';

function App() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Header />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
