import { param, body } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { authRequired } from '../../middlewares/authJWT.js';

export const createPostValidations = [
    body('title')
      .notEmpty().withMessage('El campo { title } no debe estar vacio.')
      .isString().withMessage('El campo { title } debe ser un string.'),
      authRequired,
];

export const getPlaylistValidations = [
    param('id')
      .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
      .isString().withMessage('El parametro { id } debe ser un string.')
      .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
      authRequired,
  ];
  
  export const updatePostValidations = [
    param('id')
      .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
      .isString().withMessage('El parametro { id } debe ser un string.')
      .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
    body('title')
      .optional()
      .notEmpty().withMessage('El campo { title } no debe estar vacio.')
      .isString().withMessage('El campo { title } debe ser un string.'),
      authRequired,
  ];
  
  export const deletePostValidations = [
    param('id')
      .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
      .isString().withMessage('El parametro { id } debe ser un string.')
      .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
      authRequired,
  ];
  