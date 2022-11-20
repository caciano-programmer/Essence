import styled from '@emotion/styled';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../constants/constants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { checkForErrors, noErrorState } from './loginError';

const StyledForm = styled.form({
  height: '60%',
  width: '30%',
  alignSelf: 'center',
  outline: 'solid 1px rgba(0,0,0,.25)',
  display: 'flex',
  flexDirection: 'column',
  padding: '2%',
});

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorState, setErrorState] = useState(noErrorState);

  function submit() {
    const error = isNewUser ? checkForErrors({ name, email, password, confirm }) : checkForErrors({ email, password });
    if (error.isError) setErrorState(error);
  }

  return (
    <Box sx={{ height: PAGE_HEIGHT, width: PAGE_WIDTH, display: 'flex', justifyContent: 'center' }}>
      <StyledForm>
        <div css={{ fontSize: 'calc(1vw + 1.25vh + 1.25vmin)', alignSelf: 'center', flex: 1.5 }}>
          {isNewUser ? 'Create Account' : 'Login'}
        </div>
        {isNewUser && (
          <TextField
            value={name}
            error={errorState.isError && errorState.input === 'name'}
            helperText={errorState.isError && errorState.input === 'name' ? errorState.error : ''}
            variant="standard"
            label="Name"
            inputProps={{ maxLength: 15 }}
            onChange={({ target: { value } }) => setName(value)}
            sx={{ flex: 1 }}
          />
        )}
        <TextField
          value={email}
          error={errorState.isError && errorState.input === 'email'}
          helperText={errorState.isError && errorState.input === 'email' ? errorState.error : ''}
          variant="standard"
          label="Email"
          inputProps={{ maxLength: 64 }}
          onChange={({ target: { value } }) => setEmail(value)}
          sx={{ flex: 1 }}
        />
        <TextField
          value={password}
          error={errorState.isError && errorState.input === 'password'}
          helperText={errorState.isError && errorState.input === 'password' ? errorState.error : ''}
          variant="standard"
          label="Password"
          inputProps={{ maxLength: 25, type: passwordVisibility ? 'text' : 'password' }}
          InputProps={{
            endAdornment: (
              <VisibilityIcon visible={passwordVisibility} fn={() => setPasswordVisibility(current => !current)} />
            ),
          }}
          onChange={({ target: { value } }) => setPassword(value)}
          sx={{ flex: 1 }}
        />
        {isNewUser && (
          <TextField
            value={confirm}
            error={errorState.isError && errorState.input === 'confirm'}
            helperText={errorState.isError && errorState.input === 'confirm' ? errorState.error : ''}
            variant="standard"
            label="Confirm Password"
            inputProps={{ maxLength: 25, type: passwordVisibility ? 'text' : 'password' }}
            InputProps={{
              endAdornment: (
                <VisibilityIcon visible={passwordVisibility} fn={() => setPasswordVisibility(current => !current)} />
              ),
            }}
            onChange={({ target: { value } }) => setConfirm(value)}
            sx={{ flex: 1 }}
          />
        )}
        <div css={{ alignSelf: 'center', flex: 1 }}>
          <Button variant="text" onClick={() => setIsNewUser(curr => !curr)} sx={{ mx: 4 }}>
            {isNewUser ? 'Login instead?' : 'Create account'}
          </Button>
          <Button variant="outlined" size="medium" onClick={submit} sx={{ mx: 4 }}>
            Submit
          </Button>
        </div>
      </StyledForm>
    </Box>
  );
}

function VisibilityIcon({ visible, fn }: { visible: boolean; fn: () => void }) {
  return (
    <InputAdornment position="end">
      <IconButton edge="end" onClick={fn}>
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
