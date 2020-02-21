import { object, string, date, ref } from 'yup';
// FIXME split regex into separate objects and each with its own warning
const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(^((?!:).)*$)/;
const passwordWarning = 'Must include numbers and upper/lower case characters';

export const signupSchema = object().shape({
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
    .matches(passwordRegex, passwordWarning)
    .min(7)
    .max(15)
    .required(),
  createdOn: date().default(() => new Date()),
});

export const loginSchema = object().shape({
  email: string()
    .email()
    .required(),
  password: string()
    .matches(passwordRegex, passwordWarning)
    .required()
    .min(7)
    .max(15),
});
