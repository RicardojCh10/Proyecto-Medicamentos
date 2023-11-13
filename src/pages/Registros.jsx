import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
          console.log(respuesta.data[0].id);
          setDatos({ ...datos, autenticado: true, user: respuesta.data[0].id });
        } else {
          setError("Credenciales incorrectas, inténtalo de nuevo");
        }
      })
      .catch((error) => {
        console.error("Error al iniciar sesión: " + error);
        setError("email ya registrado.");
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
    navigate("/tabla");
    return null;
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <div>
        <label>Nombre:</label>
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
        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Ingresa tu Nombre"
          value={datos.contrasena}
          onChange={(e) => {
            setDatos({ ...datos, contrasena: e.target.value });
          }}
        />
      </div>

      <div>
        <label>Confirmar Contraseña:</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          value={datos.contrasenaConfirm}
          onChange={(e) => {
            setDatos({ ...datos, contrasenaConfirm: e.target.value });
          }}
        />
      </div>

      <div>
        <label>email:</label>
        <input
          type="email"
          placeholder="ejemplo@gmail.com"
          value={datos.email}
          onChange={(e) => {
            setDatos({ ...datos, email: e.target.value });
          }}
        />
      </div>

      <button type="submit">Registrarse</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default Registros;
