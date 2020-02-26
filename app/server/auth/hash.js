import bcrypt from 'bcrypt';

const saltRounds = 10;
// TODO finish hash implementation to save in database
// hash passwords
export const hash = async (username, password) => {
  return bcrypt.hash(password, saltRounds);
};

// verifies a recieved password matches the hash stored in DB
export const authenticateLogin = async (username, password) => {
  // TODO get hash from DB here
  const retrievedHash = '';
  const result = await bcrypt.compare(password, hash);
  if (result) return result;
  throw new Error('passwords do not match');
};
