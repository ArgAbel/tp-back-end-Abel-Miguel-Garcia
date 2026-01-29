import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import 'dotenv/config';
import { connectDB } from './config/database';
/*import authRoutes from './routes/auth.routes';
import categoriesRoutes from './routes/categories.routes';
import productsRoutes from './routes/product.routes';
import { authenticate, authorize } from './middlewares/auth.middleware';*/


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
//app.use('/auth', authRoutes);
app.get('/api/saludo', (req: Request, res: Response) => {
  res.json({ mensaje: 'Hola desde la API 🚀' });
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
  });
});