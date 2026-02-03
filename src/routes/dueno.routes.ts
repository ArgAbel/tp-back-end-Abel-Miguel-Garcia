import { Router } from 'express';
import * as duenoController from '../controller/dueno.controller';
import {
  createDuenoValidator,
  updateDuenoValidator,
} from '../validators/dueno.validator';
import { authenticate, authorize } from '../middleware/auth.middleware';
import validateDto from '../middleware/dto.middleware';

const router: Router = Router();

//falta ruta de login para dueno
router.get('/', authenticate, duenoController.getAll);
router.get('/:id', authenticate, duenoController.getById);
router.post(
  '/',
  authenticate,
  authorize(['admin']),
  createDuenoValidator,
  validateDto,
  duenoController.create,
);

router.put(
  '/:id',
  authenticate,
  authorize(['admin']),
  updateDuenoValidator,
  validateDto,
  duenoController.update,
);
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  duenoController.remove,
);

export default router;
