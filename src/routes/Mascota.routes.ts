import { Router } from 'express';
import * as Mascotas from '../controller/Mascotas.controller';
import validateDto from '../middleware/dto.middleware';

const router = Router();
import { authenticate, authorize } from '../middleware/auth.middleware';



router.get('/', validateDto, Mascotas.getAll);
router.get('/:id', validateDto, Mascotas.getById);
router.post('/', validateDto, Mascotas.create);
router.put('/:id', validateDto, Mascotas.update);    
router.delete('/:id', validateDto, Mascotas.remove);

export default router;