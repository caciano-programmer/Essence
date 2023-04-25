import { validate } from 'email-validator';

type inputKey = 'name' | 'email' | 'password' | 'confirm';
type existingUser = { email: string; password: string };
type newUser = existingUser & { name: string; confirm: string };
type LoginError = { isError: boolean; error: string; input: inputKey };

const InputErrors: { [key: string]: LoginError } = {
  nameMissing: { isError: true, error: 'Name required.', input: 'name' },
  nameTooLong: { isError: true, error: 'Name must be less than 16 characters.', input: 'name' },
  passwordMissing: { isError: true, error: 'Password required.', input: 'password' },
  passwordLength: { isError: true, error: 'Password must be between 7-25 characters', input: 'password' },
  passwordContainNumber: { isError: true, error: 'Password must contain a 1 or more numbers.', input: 'password' },
  passwordContainLetter: { isError: true, error: 'Passowrd must contain 1 or more letters.', input: 'password' },
  confirmMismatch: { isError: true, error: 'Feild must match password.', input: 'confirm' },
  emailNotValid: { isError: true, error: 'Must use a valid email.', input: 'email' },
  emailTooLong: { isError: true, error: 'Email must be under 65 characters.', input: 'email' },
  emailMissing: { isError: true, error: 'Email required.', input: 'email' },
};

export function apiError(isNewUser: boolean, response: string): LoginError {
  return { isError: true, error: response, input: isNewUser ? 'email' : 'password' };
}

export const noErrorState: LoginError = { isError: false, error: '', input: 'name' };

export function checkForErrors(inputs: existingUser | newUser): LoginError {
  if ('name' in inputs) {
    const nameError = nameCheck(inputs.name);
    if (nameError.isError) return nameError;
  }

  const emailError = emailCheck(inputs.email);
  if (emailError.isError) return emailError;

  const passwordError = passwordCheck(inputs.password);
  if (passwordError.isError) return passwordError;

  if ('confirm' in inputs) {
    const confirmError = confirmCheck(inputs.password, inputs.confirm);
    if (confirmError.isError) return confirmError;
  }

  return noErrorState;
}

function nameCheck(name: string): LoginError {
  if (name.length === 0) return InputErrors.nameMissing;
  if (name.length > 15) return InputErrors.nameTooLong;
  return noErrorState;
}

function passwordCheck(pass: string): LoginError {
  if (pass.length === 0) return InputErrors.passwordMissing;
  if (pass.length > 25 || pass.length < 7) return InputErrors.passwordLength;
  if (!/\d/.test(pass)) return InputErrors.passwordContainNumber;
  if (!/[a-zA-Z]/.test(pass)) return InputErrors.passwordContainLetter;
  return noErrorState;
}

function confirmCheck(pass: string, confirmPass: string): LoginError {
  return pass === confirmPass ? noErrorState : InputErrors.confirmMismatch;
}

function emailCheck(email: string): LoginError {
  if (email.length === 0) return InputErrors.emailMissing;
  if (email.length > 64) return InputErrors.emailTooLong;
  if (!validate(email)) return InputErrors.emailNotValid;
  return noErrorState;
}
