import React, { useEffect, useState, useContext } from "react";
import Morning from "../components/Morning";
import Noon from "../components/Noon";
import Evening from "../components/Evening";
import Night from "../components/Night";
import Necessary from "../components/Necessary";
import AddNew from "../components/AddNew";
import TableHeader from "../components/Columns";
import { useNavigate } from "react-router-dom";
import "./TablaMedicamentos.css";

function TablaMedicamentos() {
  // Función para cerrar la sesión del usuario

  const cerrarSesion = () => {
    localStorage.clear(); // Limpiar datos almacenados en el localStorage
    setIsopen(false); // Cambiar el estado de la apertura a falso
    navigate("/"); // Redireccionar a la página de inicio
  };

  // Función para abrir algo (no está definido el estado abierto)
  const abrir = () => {
    setAbierto(true);
  };

  // Estado para controlar si algo está abierto o no
  const [abierto, setAbierto] = useState(false);

  // Función para la navegación dentro de la aplicación
  const navigate = useNavigate();

  // Verificar si el usuario está autenticado
  const isUserAuthenticated = () => {
    const status = localStorage.getItem("Status"); // Obtener el estado del usuario desde el localStorage
    return status === "true"; // Devolver verdadero si el estado es "true"
  };

  // Efecto para verificar la autenticación al cargar la página
  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/");
    }
  }, []);

  // Estado para controlar si algo está abierto o no
  const [isopen, setIsopen] = useState(false);

  return (
    <>
      {/* Sección principal de la tabla de medicamentos */}
      <div className="Tabla">
        <header class="bg-[#57bdb7] flex items-center justify-center h-48">
          <h1 class="text-5xl text-white font-bold text-center">
            BIENVENIDO A TU CONTROL DE MEDICAMENTOS
          </h1>
        </header>

        <br></br>
        {/* Botón para cerrar sesión */}
        <div className="flex flex-col items-center mx-2">
          <h1 className="text-3xl font-bold text-[#57bdb7] mb-4">
            ¡HOLA, INICIA TU CONTROL CON TU RECETA MEDICA!
          </h1>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => cerrarSesion()}
          >
            CERRAR SESIÓN
          </button>
        </div>

        {/* Componente para agregar nuevos medicamentos */}
        <AddNew abierto={abierto} setAbierto={setAbierto} />

        {/* Título de la tabla */}
        <div>
          <h2 className="w-full flex-col text-center text-8xl p-5">
            <span className="text-[#57bdb7] font-bold">CUADRO DE</span>
            <br />
            <span className="text-[#57bdb7] font-bold">MEDICAMENTOS</span>
          </h2>
        </div>

        {/* Sección de la tabla con componentes de medicamentos */}
        <div className="bg-[#e6f9f3] flex items-center justify-center flex-wrap py-8">
          {/* Tabla con encabezado */}
          <table className="h-80">
            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center ">
                  <TableHeader /> {/*COMPONENTE DE NOMBRES DE COLUMNAS*/}
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center ">
                  <Morning /> {/*COMPONENTE DE MORNING*/}
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Noon /> {/*COMPONENTE DE NOON*/}
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr>
                  <Evening /> {/*COMPONENTE DE EVENING*/}
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Night /> {/*COMPONENTE DE NIGHT*/}
                </tr>
              </thead>
            </table>

            <table className="my-0.5 ">
              <thead>
                <tr className="items-center justify-center ">
                  <Necessary /> {/*COMPONENTE DE NECESSARY*/}
                </tr>
              </thead>
            </table>
          </table>
        </div>
      </div>
    </>
  );
}

export default TablaMedicamentos;
