import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { authRequired } from '../../middlewares/authJWT';

export const createCommentValidations = [
  param('id')
    .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
    .isString().withMessage('El parametro { id } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
  body('autor')
    .notEmpty().withMessage('El campo { name } no debe estar vacio.')
    .isString().withMessage('El campo { name } debe ser un string.'),
  body('description')
    .notEmpty().withMessage('El campo { description } no debe estar vacio.')
    .isString().withMessage('El campo { description } debe ser un string.'),
  body('post')
    .optional()
    .isNumeric().withMessage('El campo { postId } debe ser un año válido.'),
    authRequired,
];

export const CommentValidations = [
  param('playlistId')
    .notEmpty().withMessage('El parametro { playListId } no debe estar vacio.')
    .isString().withMessage('El parametro { playListId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { playListId } debe ser una id valida.'),
    authRequired,
];

export const deleteCommentValidations = [
  param('id')
    .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
    .isString().withMessage('El parametro { id } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
//   param('commentId')
//     .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
//     .isString().withMessage('El parametro { commentId } debe ser un string.')
//     .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
    authRequired,
];

export const getCommentValidations = [
  param('id')
    .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
    .isString().withMessage('El parametro { id } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
    authRequired,
];

export const updateCommentValidations = [
  param('id')
    .notEmpty().withMessage('El parametro { id } no debe estar vacio.')
    .isString().withMessage('El parametro { id } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { id } debe ser una id valida.'),
//   param('postId')
//     .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
//     .isString().withMessage('El parametro { postId } debe ser un string.')
//     .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  body('title')
    .optional()
    .notEmpty().withMessage('El campo { title } no debe estar vacio.')
    .isString().withMessage('El campo { title } debe ser un string.'),
  body('comments')
    .optional()
    .notEmpty().withMessage('El campo { comments } no debe estar vacio.')
    .isString().withMessage('El campo { comments } debe ser un string.'),
  body('imageURL')
    .optional()
    .isNumeric().withMessage('El campo { imageURL } debe ser un año válido.')
    .notEmpty().withMessage('El campo { imageURL } no debe estar vacio.'),
    authRequired,
];