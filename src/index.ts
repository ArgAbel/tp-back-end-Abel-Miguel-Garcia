import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';

import loginRoutes from './routes/login.routes';
import Usuarioroutes from './routes/Usuario.routes';
import Mascota from './routes/Mascota.routes';
import Duenoroutes from './routes/Dueno.routes';
import Hclinica from './routes/Hclinica.routes';
import { authenticate } from './middleware/auth.middleware';
import { errorHandler } from './middleware/error.middleware';
import { AppError } from './types/appErrors';
import { loadPermissions } from './config/permissionStore';
import { authorize } from './middleware/auth.middleware';


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());
//falta autorizar y cargar los permisos
app.use('/usuarios', authenticate, authorize('read'), Usuarioroutes);
app.use('/mascotas', authenticate, Mascota);
app.use('/duenos', authenticate, Duenoroutes);
app.use('/hclinica', authenticate, Hclinica);
app.use('/login', loginRoutes);
app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});

// Catch-all 404 para rutas no encontradas
app.all('/*path', (req, _res, next) => {
  next(new AppError(`No se encontró ${req.originalUrl} en este servidor`, 404));
});
app.use(errorHandler);


const bootstrap = async () => {
  try {
    // 1. Cargamos los permisos de la DB a la memoria (RAM)
    await loadPermissions();
    
    // 2. Una vez cargados, encendemos el servidor
    app.listen(PORT, () => {
      console.log(`✅ Permisos cargados correctamente`);
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error crítico al iniciar el servidor:', error);
    process.exit(1); // Cerramos el proceso si no se pueden cargar los permisos
  }
};
bootstrap();