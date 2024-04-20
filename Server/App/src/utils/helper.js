import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';

// Función para manejar errores de forma asíncrona
export function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

// Función para enviar respuestas JSON
export function sendResponse(res, statusCode, status, data) {
  res.status(statusCode).json({
    status: status,
    data: data
  });
}

// Función para generar tokens JWT
export function generateToken(id, secret, expiresIn) {
  return sign({ id }, secret, { expiresIn });
}

// Función para hashear contraseñas
export async function hashPassword(password, saltRounds = 10) {
  return await hash(password, saltRounds);
}

// Función para comparar contraseñas
export async function comparePassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}

// Función para manejar errores de validación
export function handleValidationErrors(err) {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Datos inválidos: ${errors.join('. ')}`;
  return new AppError(message, 400);
}

// Función para manejar errores de JWT
export function handleJWTError() { return new AppError('Token inválido. Por favor inicia sesión de nuevo.', 401); }

// Función para manejar errores de JWT expirado
export function handleJWTExpiredError() { return new AppError('Tu sesión ha expirado. Por favor inicia sesión de nuevo.', 401); }

// Función para manejar errores de duplicación de campos en la base de datos
export function handleDuplicateFieldsDB(err) {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Valor duplicado: ${value}. Por favor usa un valor diferente.`;
  return new AppError(message, 400);
}

// Función para manejar errores de ID no encontrado en la base de datos
export function handleCastErrorDB(err) {
  const message = `ID inválido: ${err.value}.`;
  return new AppError(message, 400);
}