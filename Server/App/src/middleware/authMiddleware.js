import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { findByPk } from '../models/userModel.js';

// Middleware para proteger rutas
export async function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'No estás autenticado. Por favor inicia sesión para acceder a esta ruta.',
    });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET);

    const currentUser = await findByPk(decoded.id);
    if (!currentUser || currentUser.email !== decoded.email) { // Verificar que el correo electrónico en el token coincide con el del usuario
      return res.status(401).json({
        status: 'fail',
        message: 'El usuario al que pertenece este token ya no existe.',
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      message: 'Hubo un error al verificar el token. Por favor inicia sesión de nuevo.',
    });
  }
}

// Middleware para restringir el acceso a ciertos roles de usuario
export function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'No tienes permiso para realizar esta acción.',
      });
    }

    next();
  };
}