import jsonwebtoken from 'jsonwebtoken';

const sectretKey = process.env.SECRET_KEY || 'secret';

export const jwt = payload =>
  new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, sectretKey, { expiresIn: '16h' }, (err, token) => {
      err == null ? resolve(token) : reject(err);
    });
  });

export const verifyJwt = async token =>
  new Promise(resolve => {
    jsonwebtoken.verify(token, sectretKey, (err, payload) => {
      if (err == null) resolve(payload);
      else throw new Error('Authentication failed');
    });
  });
