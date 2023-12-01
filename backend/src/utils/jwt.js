import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
  
export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwt_secret, { expiresIn: "5D" }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
};
  