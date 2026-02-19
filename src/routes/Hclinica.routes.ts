import { Router } from 'express';
import * as Hclinica from '../controller/Hclinica.controller';
import validateDto from '../middleware/dto.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
const router = Router();



router.get('/', authenticate, validateDto, Hclinica.getAll);
router.get('/:id', authenticate, validateDto, Hclinica.getById);
router.post('/', authenticate, validateDto, Hclinica.create);
router.put('/:id', authenticate, validateDto, Hclinica.update);    
router.delete('/:id', authenticate, validateDto, Hclinica.remove);

export default router;