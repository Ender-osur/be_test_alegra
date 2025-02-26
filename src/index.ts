import express from 'express';
import cors from 'cors';
import { setupProxy } from './proxy';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Habilita CORS para el frontend
app.use(express.json()); // Permite recibir JSON en las solicitudes

// Configura el proxy
setupProxy(app);

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});