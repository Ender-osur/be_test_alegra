import express from 'express';
import cors from 'cors';
import { setupProxy } from './proxy';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://testalegra-production.up.railway.app', 
  'http://localhost:3000',
  'http://localhost:5173',
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error('Acceso no permitido por CORS')); 
    }
  },
  credentials: true,
}));

app.use(express.json());

setupProxy(app);

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});