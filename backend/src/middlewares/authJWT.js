import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const authRequired = (req, res, next) => {  
  const { token } = req.cookies;
  
  if (!token) 
  return res.status(401).json({ message: "Autorización denegada, no hay token" });
  jwt.verify(token, config.jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });
    req.user = user;
    });
next();
};