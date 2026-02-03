import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import { connectDB } from './config/database';
import duenoRoutes from './routes/dueno.routes';
import loginRoutes from './routes/login.routes';
import { authenticate, authorize } from '../src/middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());

app.use('/api/', authenticate, duenoRoutes);
app.use('/login', loginRoutes);
app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
  });
});