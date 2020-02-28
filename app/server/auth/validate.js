import { object, string, ref } from 'yup';

const regex = {
  number: /(?=.*[0-9])/,
  letter: /(?=.*[a-z])/,
  capitalize: /(?=.*[A-Z])/,
  colon: /(^((?!:).)*$)/,
  spaces: /^\S*$/,
};

const signupSchema = object().shape({
  name: string()
    .min(1)
    .max(30)
    .matches(regex.spaces, 'Name must not contain any spaces')
    .required(),
  email: string()
    .max(255)
    .email()
    .required(),
  confirm: string()
    .oneOf([ref('email'), null], 'Emails must match')
    .required(),
  password: string()
    .matches(regex.colon, 'Password must not contain colon character ":"')
    .matches(regex.letter, 'Password must contain lower case letters')
    .matches(regex.capitalize, 'Password must contain upper case letters')
    .matches(regex.number, 'Password must contain numbers')
    .min(7)
    .max(76)
    .required(),
});

const loginSchema = object().shape({
  email: string()
    .max(255)
    .email()
    .required(),
  password: string()
    .matches(regex.colon, 'Password must not contain colon character ":"')
    .matches(regex.letter, 'Password must contain lower case letters')
    .matches(regex.capitalize, 'Password must contain upper case letters')
    .matches(regex.number, 'Password must contain numbers')
    .required()
    .min(7)
    .max(76),
});

export const validateLogin = loginObj => loginSchema.validate(loginObj);

export const validateSignup = signupObj => signupSchema.validate(signupObj);
