import React, { useEffect, useState, useContext } from "react";
import Morning from "../components/Mañana";
import MedioDia from "../components/MedioDia";
import Tarde from "../components/Tarde";
import Noche from "../components/Noche";
import Necesario from "../components/Necesario";
import Agregar from "../components/Agregar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContexto } from "../context/MainContext";

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
      <div>
        <div>
          <h2 className="w-full flex-col text-center text-3xl p-5">
            MEDICAMENTOS
          </h2>
        </div>

        <div className="bg-white rounded-sm w-[90%] mx-auto h-[40%] border-x-2 border-b-4 border-t flex items-center justify-center flex-wrap py-8">
          <div className="flex items-center justify-between w-full mx-10">
            <button
              className="text-black border-red-600 border-2 transition-all duration-300 ease-in-out hover:bg-red-700 focus:ring focus:outline-none focus:ring-red-300 m-3 px-2 border border-red-600 rounded-sm w-32"
              onClick={() => cerrarSesion()}
            >
              CERRAR SESIÓN
            </button>
          </div>

          <table className="h-80">
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
                  <MedioDia />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr>
                  <Tarde />
                </tr>
              </thead>
            </table>

            <table className="my-0.5">
              <thead>
                <tr className="items-center justify-center">
                  <Noche />
                </tr>
              </thead>
            </table>

            <table className="my-0.5 ">
              <thead>
                <tr className="items-center justify-center ">
                  <Necesario />
                </tr>
              </thead>
            </table>
          </table>
        </div>
      </div>

      <Agregar abierto={abierto} setAbierto={setAbierto} />
    </>
  );
}

export default Tabla;
