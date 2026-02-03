import { Router } from 'express';
import * as authController from '../controller/login.controller';
import validateDto from '../middleware/dto.middleware';
import * as loginService from '../services/login.service';
import { registerValidators } from '../validators/register.validator';
const router = Router();

// Reglas de validación para registro


router.post('/register', registerValidators, validateDto, authController.register);
router.post('/login', authController.login);

export default router;