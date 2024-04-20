import React, { useState } from 'react';
import { register } from '../../services/authServise';

const Register = () => {
  const [username, setUsername] = useState(''); // Cambia 'name' a 'username'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const registerData = { username, email, password }; // Cambia 'name' a 'username'
      const userData = await register(registerData);
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username} // Cambia 'name' a 'username'
        onChange={(e) => setUsername(e.target.value)} // Cambia 'setName' a 'setUsername'
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;