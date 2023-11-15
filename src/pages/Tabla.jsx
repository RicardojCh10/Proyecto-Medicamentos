import React, { useEffect, useState, useContext } from "react";
import Morning from "../components/Morning";
import Noon from "../components/Noon";
import Evening from "../components/Evening";
import Night from "../components/Night";
import Necessary from "../components/Necessary";
import AddNew from "../components/AddNew";
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
          <h2 className="w-full flex-col text-center text-8xl p-5">
            <span className="text-[#57bdb7] font-bold">CUADRO DE</span>
            <br />
            <span className="text-[#57bdb7] font-bold">MEDICAMENTOS</span>
          </h2>
        </div>

        <AddNew abierto={abierto} setAbierto={setAbierto} />

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
