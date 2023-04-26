import { Box } from '@mui/material';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../constants/constants';

//TODO make unavailable when logged out
//TODO consider preloading this info before user clicks on this page
function Profile() {
  return <Box css={{ height: PAGE_HEIGHT, width: PAGE_WIDTH }}>Profile Page</Box>;
}

export default Profile;
