import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registros.css"; // Asegúrate de que este sea el nombre correcto de tu archivo CSS

function Registros() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    nombre: "",
    contrasena: "",
    contrasenaConfirm: "",
    email: "",
    autenticado: false,
    user: "",
  });

  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !datos.nombre.trim() ||
      !datos.email.trim() ||
      !datos.contrasena.trim() ||
      !datos.contrasenaConfirm.trim()
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (datos.contrasena !== datos.contrasenaConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    axios
      .post("http://localhost:8082/registro", datos)
      .then((respuesta) => {
        if (respuesta.status === 200) {
          console.log(respuesta.data[0].id_user);
          setDatos({ ...datos, autenticado: true, user: respuesta.data[0].id_user });
        } else {
          setError("Credenciales incorrectas, inténtalo de nuevo");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión: " + error);
        setError("Email ya registrado.");
      });
  };

  useEffect(() => {
    const status = localStorage.getItem("Status");
    const email = localStorage.getItem("email");
    const user = localStorage.getItem("user");
    if (status === "true") {
      setDatos({ ...datos, autenticado: true, email });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("email", datos.email);
    localStorage.setItem("Status", datos.autenticado);
    localStorage.setItem("user", datos.user);
  }, [datos.autenticado, datos.email, datos.user]);

  if (datos.autenticado) {
    navigate("/TablaMedicamentos");
    return null;
  }

  return (
    <div className="registro-background">
    <div className="registro-container">
      <form onSubmit={handleRegister}>
        <h2 className="mb-4 text-2xl font-bold">Registrarse</h2>
        <div>
          <label>NOMBRE:</label>
          <input
            type="text"
            placeholder="Ingresa tu Nombre"
            value={datos.nombre}
            onChange={(e) => {
              setDatos({ ...datos, nombre: e.target.value });
            }}
          />
        </div>

        <div>
          <label>CONTRASEÑA:</label>
          <input
            type="password"
            placeholder="Ingresa tu Contraseña"
            value={datos.contrasena}
            onChange={(e) => {
              setDatos({ ...datos, contrasena: e.target.value });
            }}
          />
        </div>

        <div>
          <label>CONFIRMAR CONTRASEÑA:</label>
          <input
            type="password"
            placeholder="Confirma tu Contraseña"
            value={datos.contrasenaConfirm}
            onChange={(e) => {
              setDatos({ ...datos, contrasenaConfirm: e.target.value });
            }}
          />
        </div>

        <div>
          <label>EMAIL:</label>
          <input
            type="email"
            placeholder="medicamentos@gmail.com"
            value={datos.email}
            onChange={(e) => {
              setDatos({ ...datos, email: e.target.value });
            }}
          />
        </div>

        <button type="submit">CREAR CUENTA</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
    </div>
  );
}

export default Registros;
