import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = async pass => bcrypt.hash(pass, saltRounds);

export const passwordsMatch = async (password, hashedPassword) => {
  const result = await bcrypt.compare(password, hashedPassword);
  if (result) return result;
  throw new Error('passwords do not match');
};
