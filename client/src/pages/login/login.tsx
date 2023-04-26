import styled from '@emotion/styled';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { emptyLoginUser, PAGE_HEIGHT, PAGE_WIDTH } from '../../constants/constants';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { apiError, checkForErrors, noErrorState } from './loginError';
import { authenticate } from '../../api/api';
import { UserContext } from '../../layout/userContext';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled.form({
  height: '60%',
  width: '30%',
  alignSelf: 'center',
  outline: 'solid 1px rgba(0,0,0,.25)',
  display: 'flex',
  flexDirection: 'column',
  padding: '2%',
});
//TODO consider adding loading spinner
export default function Login() {
  const [user, setUser] = useState(emptyLoginUser);
  const [confirm, setConfirm] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorState, setErrorState] = useState(noErrorState);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  function submit() {
    const error = isNewUser
      ? checkForErrors({ ...user, confirm })
      : checkForErrors({ email: user.email, password: user.password });
    setErrorState(error);
    if (!error.isError)
      authenticate(user).then(
        ({ data: { name, email } }) => {
          userContext.setUser({ name, email });
          navigate('/essence');
        },
        ({ response }) => setErrorState(apiError(isNewUser, response.data)),
      );
  }

  return (
    <Box sx={{ height: PAGE_HEIGHT, width: PAGE_WIDTH, display: 'flex', justifyContent: 'center' }}>
      <StyledForm>
        <div css={{ fontSize: 'calc(1vw + 1.25vh + 1.25vmin)', alignSelf: 'center', flex: 1.5 }}>
          {isNewUser ? 'Create Account' : 'Login'}
        </div>
        {isNewUser && (
          <TextField
            value={user.name}
            error={errorState.isError && errorState.input === 'name'}
            helperText={errorState.isError && errorState.input === 'name' ? errorState.error : ''}
            variant="standard"
            label="Name"
            inputProps={{ maxLength: 15 }}
            onChange={({ target: { value } }) => setUser(curr => ({ ...curr, name: value.replaceAll(' ', '') }))}
            sx={{ flex: 1 }}
          />
        )}
        <TextField
          value={user.email}
          error={errorState.isError && errorState.input === 'email'}
          helperText={errorState.isError && errorState.input === 'email' ? errorState.error : ''}
          variant="standard"
          label="Email"
          inputProps={{ maxLength: 64 }}
          onChange={({ target: { value } }) => setUser(curr => ({ ...curr, email: value.trim() }))}
          sx={{ flex: 1 }}
        />
        <TextField
          value={user.password}
          error={errorState.isError && errorState.input === 'password'}
          helperText={errorState.isError && errorState.input === 'password' ? errorState.error : ''}
          variant="standard"
          label="Password"
          inputProps={{ maxLength: 25, type: passwordVisibility ? 'text' : 'password' }}
          InputProps={{
            endAdornment: (
              <VisibilityIcon visible={passwordVisibility} fn={() => setPasswordVisibility(curr => !curr)} />
            ),
          }}
          onChange={({ target: { value } }) => setUser(curr => ({ ...curr, password: value.replaceAll(' ', '') }))}
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
                <VisibilityIcon visible={passwordVisibility} fn={() => setPasswordVisibility(curr => !curr)} />
              ),
            }}
            onChange={({ target: { value } }) => setConfirm(value)}
            sx={{ flex: 1 }}
          />
        )}
        <div css={{ alignSelf: 'center', flex: 1 }}>
          <Button
            variant="text"
            onClick={() => {
              setUser({ ...emptyLoginUser });
              setIsNewUser(curr => !curr);
              setConfirm('');
              setErrorState({ ...noErrorState });
            }}
            sx={{ mx: 4 }}
          >
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
