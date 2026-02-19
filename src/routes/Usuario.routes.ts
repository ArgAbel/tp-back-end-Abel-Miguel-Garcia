import { Router } from 'express';
import * as Usuario from '../controller/Usuario.controller';
import validateDto from '../middleware/dto.middleware';

const router = Router();
import { authenticate, authorize } from '../middleware/auth.middleware';



router.get('/', validateDto, Usuario.getAll);
router.get('/:id', validateDto, Usuario.getById);
router.post('/', validateDto, Usuario.create);
router.put('/:id', validateDto, Usuario.update);    
router.delete('/:id', validateDto, Usuario.remove);

export default router;