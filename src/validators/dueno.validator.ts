import { body } from 'express-validator';
import { ValidationChain } from 'express-validator';
import { getAllDuenos } from '../services/dueno.service';
import { remove } from '../controller/dueno.controller';

export const validateEmail: ValidationChain[] = [
  body('email')
    .isEmail()
    .withMessage('Debe ser un email válido')
    .normalizeEmail(),
];
const Username: ValidationChain[] = [
  body('Username')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio')
    .isString()
    .withMessage('El nombre de usuario debe ser una cadena de texto')
    .isLength({ max: 50, min: 3 })
    .withMessage(
      'El nombre de usuario debe tener entre 3 y 50 caracteres',
    ),
];

export const getDuenoByIdValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];

export const createDuenoValidator: ValidationChain[] = [
  ...Username,
  ...validateEmail,
];

export const updateDuenoValidator: ValidationChain[] = [
  ...Username,
  ...validateEmail,
];

export const removeDuenoValidator: ValidationChain[] = [
  body('id')
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),
];