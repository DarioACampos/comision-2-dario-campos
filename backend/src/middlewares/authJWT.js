import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  const tokens = req.headers.authorization
  // console.log(tokens);

  if (!token && !tokens) {
    return res.status(401).json({ message: "Autorización denegada, no hay token" });
  }
  const tokenToVerify = token || tokens;
  jwt.verify(tokenToVerify, config.jwt_secret, (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  });
};