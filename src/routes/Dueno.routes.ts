import { Router } from 'express';
import * as Dueno from '../controller/Dueno.controller';
import validateDto from '../middleware/dto.middleware';

const router = Router();
import { authenticate, authorize } from '../middleware/auth.middleware';


router.get('/', validateDto, Dueno.getAll);
router.get('/:id', validateDto, Dueno.getById);
router.post('/', validateDto, Dueno.create);
router.put('/:id', validateDto, Dueno.update);    
router.delete('/:id', validateDto, Dueno.remove);

export default router;