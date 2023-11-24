import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContexto } from "../context/MainContext";
import night from "../assets/night.png";

function Night() {
  const [medicamentos, setMedicamentos] = useState([]);
  const { handleDelete, handleTime, triggerEffect } = useContexto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosNight",
          {
            params: { user },
          }
        );
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error("ERROR AL REALIZAR PETICIÓN", error);
      }
    };
    fetchData(); // fetch inicial

    const intervalId = setInterval(() => {
      fetchData();
    }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000); // Random time between 2 and 5 seconds

    // Clear the interval when the component is unmounted or when the dependency array changes
    return () => clearInterval(intervalId);
  }, [triggerEffect]);

  return (
    <>
      {/*Nombre*/}
      <th className="bg-[#6a8cba] w-40 h-25  rounded-l-lg rounded-r-none font-semibold">
        NIGHT
        <img
          className="items-center justify-center mx-auto mb-auto w-20 h-20"
          src={night}
        ></img>
      </th>
      <td className="bg-[#aac3df]  w-40 border-r-2">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 className="h-15">{medicamento.nombre_medicamento}</h2>
          ))
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>
      {/*Dosis*/}
      <td className="bg-[#6a8cba]  w-40  border-r-2 text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={index} className="h-15">
              {medicamento.dosis}
            </h2>
          ))
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>

      {/* Inicio hora */}

      <td className=" bg-[#aac3df]  border-r-2 w-40 h-fit text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => {
            const currentTime = new Date();

            // Use the current date instead of a fixed date (e.g., 2023-11-10)
            const currentYear = currentTime.getFullYear();
            const currentMonth = currentTime.getMonth() + 1; // Months are zero-based
            const currentDay = currentTime.getDate();

            const horaProgramada = new Date(
              `${currentYear}-${currentMonth}-${currentDay} ${medicamento.hora}`
            );

            // Check if the current time is greater than the scheduled time
            const showButton = currentTime > horaProgramada;

            return (
              <h2 key={index} className="h-15">
                {medicamento.hora}
                {showButton && (
                  <button
                    className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleTime(medicamento.id_medicamento)}
                  >
                    TOMADO
                  </button>
                )}
              </h2>
            );
          })
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>

      {/* Finalhora */}

      {/*Tiempo - ultima_hora*/}
      <td className="bg-[#6a8cba] w-40 h-24 border-r-2 text-center">
        <td className="bg-[#6a8cba]  w-40 h-fit ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={index} className="h-15">
                {medicamento.fecha}
              </h2>
            ))
          ) : (
            <p>CARGANDO DATOS...</p>
          )}
        </td>
      </td>
      {/*Comentarios*/}
      <td className="bg-[#aac3df] w-60 h-fit border-r-2">
        <h2 className="h-30 ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={index} className="w-30">
                {medicamento.comentarios}
              </h2>
            ))
          ) : (
            <p>CARGANDO DATOS...</p>
          )}
        </h2>
      </td>
      <td className=" bg-[#6a8cba] w-40 h-10 rounded-r-lg rounded-l-none">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <button
              className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(medicamento.id_medicamento)}
            >
              TERMINADO
              
            </button>
            
          ))
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>
    </>
  );
}

export default Night;
