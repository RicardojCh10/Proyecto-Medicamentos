import React, { useEffect, useState, useContext } from "react";
import Morning from "../components/Morning";
import Noon from "../components/Noon";
import Evening from "../components/Evening";
import Night from "../components/Night";
import Necessary from "../components/Necessary";
import AddNew from "../components/AddNew";
import TableHeader from "../components/Columns";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../context/MainContext";
import "./Tabla.css";

function Tabla() {
  const cerrarSesion = () => {
    localStorage.clear();
    setIsopen(false);
    navigate("/");
  };

  const abrir = () => {
    setAbierto(true);
  };

  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const isUserAuthenticated = () => {
    const status = localStorage.getItem("Status");
    return status === "true";
  };

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate("/");
    }
  }, []);
  const [isopen, setIsopen] = useState(false);

  return (
    <>
      <div className="Tabla">
        <header class="bg-[#57bdb7] flex items-center justify-center h-48">
          <h1 class="text-5xl text-white font-bold text-center">
            BIENVENIDO A TU CONTROL DE MEDICAMENTOS 
          </h1>
        </header>

        <br></br>
        <div className="flex flex-col items-center mx-2">
          <h1 className="text-3xl font-bold text-[#57bdb7] mb-4">¡HOLA, INICIA TU CONTROL CON TU RECETA MEDICA!</h1>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => cerrarSesion()}>
            CERRAR SESIÓN
          </button>
        </div>

        <AddNew abierto={abierto} setAbierto={setAbierto} />

        <div>
          <h2 className="w-full flex-col text-center text-8xl p-5">
            <span className="text-[#57bdb7] font-bold">CUADRO DE</span>
            <br />
            <span className="text-[#57bdb7] font-bold">MEDICAMENTOS</span>
          </h2>
        </div>

        <div className="bg-[#e6f9f3] flex items-center justify-center flex-wrap py-8">
          <table className="h-80">
            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center ">
                  <TableHeader />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center ">
                  <Morning />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Noon />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr>
                  <Evening />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Night />
                </tr>
              </thead>
            </table>

            <table className="my-0.5 ">
              <thead>
                <tr className="items-center justify-center ">
                  <Necessary />
                </tr>
              </thead>
            </table>
          </table>
        </div>
      </div>
    </>
  );
}

export default Tabla;
