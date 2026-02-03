import { Router } from 'express';
import * as authController from '../controller/login.controller';
import validateDto from '../middleware/dto.middleware';
import { registerValidators } from '../validators/register.validator';
const router = Router();
import { authenticate, authorize } from '../middleware/auth.middleware';
// Reglas de validación para registro


router.post('/register', registerValidators, validateDto, authController.register);
router.post('/', authController.login);

export default router;