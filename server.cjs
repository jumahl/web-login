const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const getConnection = require('./src/config/bd.cjs');
const { secretKey } = require('./configkey.cjs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/api/login', async (req, res) => {
  console.log('Ruta /api/login alcanzada');
  const { email, password } = req.body;

  try {
    const connection = await getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    await connection.execute(query, [email, hashedPassword]);

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await getConnection();

    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await connection.execute(query, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey , { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});