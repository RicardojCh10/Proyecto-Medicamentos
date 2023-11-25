import React, { useState, useEffect } from "react";
import axios from "axios";
import night from "../assets/night.png";
import { useContexto } from "../Hook/MedicationContext";

function Night() {
  // Estado local para almacenar los medicamentos
  const [medicamentos, setMedicamentos] = useState([]);

  // Obtener funciones del contexto
  const { handleDelete, handleTime, triggerEffect } = useContexto();

  useEffect(() => {
    // Función para obtener datos de medicamentos por momento del horario
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosNight",
          {
            params: { user },
          }
        );
        // Establecer los datos de medicamentos en el estado local
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error("ERROR AL REALIZAR PETICIÓN", error);
      }
    };
    fetchData(); // Llamada inicial para obtener datos

    // Intervalo para obtener datos de manera periódica con un tiempo aleatorio entre 2 y 5 segundos
    const intervalId = setInterval(() => {
      fetchData();
    }, Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000);

    // Limpiar el intervalo cuando el componente se desmonta o cuando cambia el array de dependencias
    return () => clearInterval(intervalId);
  }, [triggerEffect]); // Ejecutar efecto cuando triggerEffect cambie

  return (
    <>
      {/* Encabezado */}
      <th className="bg-[#6a8cba] w-40 h-25  rounded-l-lg rounded-r-none font-semibold">
        NIGHT
        <img
          className="items-center justify-center mx-auto mb-auto w-20 h-20"
          src={night}
        ></img>
      </th>

      {/* Nombre de medicamentos */}
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

      {/* Hora de inicio */}
      <td className=" bg-[#aac3df]  border-r-2 w-40 h-fit text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => {
            const currentTime = new Date();
            // Utilice la fecha actual en lugar de una fecha fija (por ejemplo, 2023-11-10)
            const currentYear = currentTime.getFullYear();
            const currentMonth = currentTime.getMonth() + 1;
            const currentDay = currentTime.getDate();

            const horaProgramada = new Date(
              `${currentYear}-${currentMonth}-${currentDay} ${medicamento.hora}`
            );

            //Comprueba si la hora actual es mayor que la hora programada
            const showButton = currentTime > horaProgramada;

            //Botón TOMADO el cual aparece solo si se cumple la condicion de horas
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

      {/* Botón TERMINADO */}
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
