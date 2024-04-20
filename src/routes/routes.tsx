import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirigir a los usuarios a la página de inicio de sesión cuando visiten la ruta raíz */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;