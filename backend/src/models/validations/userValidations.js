import { body } from 'express-validator';
import { authRequired } from '../../middlewares/authJWT.js';
import User from "../userModel.js"

export const createUserValidations = [
  body('avatarURL')
    .notEmpty().withMessage('El campo { avatarURL } no debe estar vacio.')
    .isString().withMessage('El campo { avatarURL } debe ser un string.')
    .isURL().withMessage('El campo { avatarURL } debe ser una URL válida.'),

  body('email')
    .notEmpty().withMessage('El campo { email } no debe estar vacio.')
    .isEmail().withMessage('El campo { email } debe ser un email válido.')
    // validación personalizada para verificar que el email no esté en uso.
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) throw new Error('Email already in use');

      return true;
    }),

  body('username')
    .notEmpty().withMessage('El campo { username } no debe estar vacio.')
    .isString().withMessage('El campo { username } debe ser un string.')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });

      if (user) throw new Error('username already in use');

      return true;
    }),
    
  body('password')
    .notEmpty().withMessage('El campo { password } no debe estar vacio.')
    .isString().withMessage('El campo { password } debe ser un string.'),
    authRequired,
];