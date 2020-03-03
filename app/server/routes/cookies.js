import { jwt } from '../auth/jwt';

export const addCsrfCookie = async (response, uuid) => {
  response.cookie('csrfToken', uuid, {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    expires: addHours(16),
  });
};

export const addJwtCookie = async (response, email, uuid) => {
  response.cookie('jwt', await jwt({ email, uuid }), {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    expires: addHours(16),
    httpOnly: true,
  });
};

function addHours(hours) {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date;
}
