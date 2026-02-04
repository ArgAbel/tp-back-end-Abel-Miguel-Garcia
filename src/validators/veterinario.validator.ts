import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';

export const validateEmail: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];
const username: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage(
      'El nombre de usuario debe tener entre 3 y 50 caracteres',
    ),
];

export const getVeterinarioByIdValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];

export const createVeterinarioValidator: ValidationChain[] = [
  ...username,
  ...validateEmail,
];

export const updateVeterinarioValidator: ValidationChain[] = [
  ...username,
  ...validateEmail,
];

export const removeVeterinarioValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];
