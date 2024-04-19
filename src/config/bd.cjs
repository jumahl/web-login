const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'carnet',
  port: 3306,
};

const getConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

module.exports = getConnection;