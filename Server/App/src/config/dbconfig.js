import Sequelize from 'sequelize';
import { config } from 'dotenv';
config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos establecida con éxito.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

export const define = sequelize.define.bind(sequelize);
export default sequelize;