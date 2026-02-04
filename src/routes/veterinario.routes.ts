import { Router } from 'express';
import * as veterinarioController from '../controller/veterinario.controller';
import {
  createVeterinarioValidator,
  updateVeterinarioValidator,
} from '../validators/veterinario.validator';
import { authenticate, authorize } from '../middleware/auth.middleware';
import validateDto from '../middleware/dto.middleware';

const router: Router = Router();

router.get('/', authenticate, veterinarioController.getAll);
router.get('/:id', authenticate, veterinarioController.getById);
router.post(
  '/',
  authorize(['admin']),
  createVeterinarioValidator,
  validateDto,
  veterinarioController.create,
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin']),
  updateVeterinarioValidator,
  validateDto,
  veterinarioController.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  veterinarioController.remove,
);

export default router;
