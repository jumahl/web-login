import { DataTypes } from 'sequelize';
import { define } from '../config/dbconfig.js';
import validator from 'validator';

const User = define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Desactivar las columnas de marca de tiempo
  timestamps: false,
});

export async function create(userDetails) {
  try {
    // Validar y sanitizar los datos de entrada
    const username = validator.escape(userDetails.username);
    const email = validator.escape(userDetails.email);
    const password = validator.escape(userDetails.password);

    const user = await User.create({ username, email, password });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function findOne(query) {
  try {
    // Validar y sanitizar los datos de entrada
    const username = validator.escape(query.username);

    const user = await User.findOne({ where: { username } }); // Buscar el usuario solo por su nombre de usuario
    return user;
  } catch (error) {
    throw error;
  }
}

export async function findByPk(id) {
  try {
    // Validar y sanitizar los datos de entrada
    const sanitizedId = validator.escape(id);

    const user = await User.findByPk(sanitizedId);
    return user;
  } catch (error) {
    throw error;
  }
}