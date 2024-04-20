import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { create, findOne } from '../models/userModel.js';
import { config } from 'dotenv';
config();

export async function register(req, res) {
  try {
    const hashedPassword = await hash(req.body.password, 10);
    const user = await create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = sign({ id: user.id }, process.env.JWT_SECRET, { // Usa process.env.JWT_SECRET como la clave secreta
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    console.error('Error in register:', err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}

export async function login(req, res) {
  try {
    const user = await findOne({ username: req.body.username });
    if (!user || !(await compare(req.body.password, user.password))) {
      throw new Error('Incorrect username or password');
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: 'success',
      data: {
        token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}