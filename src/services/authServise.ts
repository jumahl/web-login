import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  username: string;
}

export const login = async (loginData: LoginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData); // Cambiar la ruta a /api/users/login
    return response.data;
  } catch (error) {
    throw new Error('Error en el inicio de sesión');
  }
};

export const register = async (registerData: RegisterData) => {
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error details:', errorData);
      throw new Error('Error en el registro');
    }

    const data = await response.json();

    if (data.status === 'success') {
      // Guarda el token en localStorage
      localStorage.setItem('token', data.token); // Usa data.token en lugar de data.data.token

      // Redirige al usuario al dashboard
      window.location.href = '/dashboard';
    } else {
      // Maneja el error
      console.error(data.message);
      throw new Error(data.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};