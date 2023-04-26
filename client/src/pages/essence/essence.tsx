import { Box } from '@mui/material';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../constants/constants';

//TODO consider adding loading spinner when data is loading in or some other indicator
export default function Essence() {
  return <Box css={{ height: PAGE_HEIGHT, width: PAGE_WIDTH }}>Essence Page</Box>;
}
