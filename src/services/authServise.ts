import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
  } catch (error) {
    throw new Error('Error en el inicio de sesión');
  }
};

export const register = async (registerData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerData);
    return response.data;
  } catch (error) {
    throw new Error('Error en el registro');
  }
};