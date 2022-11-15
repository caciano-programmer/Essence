import { Box } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import Header from '../components/header';
import router from '../router/router';

function App() {
  return (
    <Box>
      <Header />
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
