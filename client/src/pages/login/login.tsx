import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../constants/constants';

const StyledForm = styled.div({
  height: '60%',
  width: '30%',
  alignSelf: 'center',
  outline: 'solid 1px rgba(0,0,0,.4)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
// TODO remove FormControl if unneccessary
export default function Login() {
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <Box sx={{ height: PAGE_HEIGHT, width: PAGE_WIDTH, display: 'flex', justifyContent: 'center' }}>
      <StyledForm onSubmit={submit}>
        <div css={{ fontSize: 'calc(1.5vw + 2vh + 2vmin)' }}>{isNewUser ? 'Create Account' : 'Login'}</div>
        {isNewUser && <TextField label="Name" required inputProps={{ maxLength: 15 }} />}
        <TextField label="Email" required inputProps={{ maxLength: 15 }} />
        <TextField label="Password" required inputProps={{ maxLength: 20 }} />
        {isNewUser && <TextField label="Confirm Password" required inputProps={{ maxLength: 20 }} />}
      </StyledForm>
    </Box>
  );
}

function submit() {
  console.log('called');
}
