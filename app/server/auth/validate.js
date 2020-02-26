import { object, string, date, ref } from 'yup';

const regex = { number: /(?=.*[0-9])/, letter: /(?=.*[a-z])/, capitalize: /(?=.*[A-Z])/, colon: /(^((?!:).)*$)/ };

const signupSchema = object().shape({
  name: string()
    .min(2)
    .max(15)
    .required(),
  email: string()
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
    .max(15)
    .required(),
  createdOn: date().default(() => new Date()),
});

const loginSchema = object().shape({
  email: string()
    .email()
    .required(),
  password: string()
    .matches(regex.colon, 'Password must not contain colon character ":"')
    .matches(regex.letter, 'Password must contain lower case letters')
    .matches(regex.capitalize, 'Password must contain upper case letters')
    .matches(regex.number, 'Password must contain numbers')
    .required()
    .min(7)
    .max(15),
});

export const validateLogin = loginObj => loginSchema.validate(loginObj);

export const validateSignup = signupObj => signupSchema.validate(signupObj);
