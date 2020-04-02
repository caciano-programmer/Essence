import { jwt } from '../auth/jwt';

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
