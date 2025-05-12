import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import { connectDB } from './config/db';

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

dotenv.config();


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
