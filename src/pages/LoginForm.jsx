import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [datos, setDatos] = useState({
    email: '',
    contrasena: '',
    autenticado: false,
    user: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!datos.email.trim() || !datos.contrasena.trim()) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    axios.post('http://localhost:8082/login', datos)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          setDatos({ ...datos, autenticado: true, user: respuesta.data[0].id });
        } else {
          setError('Credenciales incorrectas, inténtalo de nuevo');
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión: ' + error);
        setError('Credenciales incorrectas.');
      });
  };

  useEffect(() => {
    const status = localStorage.getItem('Status');
    const email = localStorage.getItem('email');
    const user = localStorage.getItem('user')
    if (status === 'true') {
      setDatos({ ...datos, autenticado: true, email });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('email', datos.email);
    localStorage.setItem('Status', datos.autenticado);
    localStorage.setItem('user', datos.user)
  }, [datos.autenticado, datos.email, datos.user]);

  const cerrarSesion = () => {
    localStorage.clear();
    setDatos({ ...datos, autenticado: false });
  };

  if (datos.autenticado) {
    navigate('/tabla');
    return null;
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2 className="mb-4">Iniciar sesión</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">email:</label>
          <input
            type='email'
            className="form-control"
            placeholder='ejemplo@gmail.com'
            name='email'
            value={datos.email}
            onChange={(e) => { setDatos({ ...datos, email: e.target.value }) }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder='**'
            name='contrasena'
            value={datos.contrasena}
            onChange={(e) => { setDatos({ ...datos, contrasena: e.target.value }) }}
          />
          {showPassword ? (
            <small className="form-text text-muted" onClick={handleShowPassword}>Ocultar contraseña</small>
          ) : (
            <small className="form-text text-muted" onClick={handleShowPassword}>Mostrar contraseña</small>
          )}
        </div>
        <button type='submit' className="btn btn-primary">Iniciar sesión</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <div className="mt-3">
          ¿No tienes una cuenta?
          <Link to="/registro" className="ms-2">Regístrate</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;