import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hash = async pass => bcrypt.hash(pass, saltRounds);

export const passwordsMatch = (pass, hashedPass) => bcrypt.compare(pass, hashedPass);
