import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { register, login } from './src/controllers/userController.js';

const app = express();

// Configuración de seguridad HTTP
app.use(helmet());

// Limitar solicitudes desde la misma IP
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo en una hora'
});
app.use('/api', limiter);

// Parsear el cuerpo de las solicitudes
app.use(json({ limit: '10kb' })); // Body limit is 10

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Permitir solicitudes de origen cruzado
app.use(cors());

// Rutas
app.post('/api/register', register);
app.post('/api/users/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

export default app;