import React, { useState, useEffect } from "react";
import axios from "axios";
import pastillas from "../assets/pastillas.png";
import { useContexto } from "../Hook/MedicationContext";

function Necessary() {
  // Estado local para almacenar los medicamentos
  const [medicamentos, setMedicamentos] = useState([]);

  // Obtener funciones del contexto
  const { handleDelete, triggerEffect } = useContexto();

  useEffect(() => {
    // Función para obtener datos de medicamentos por momento del horario
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosNecessary",
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

    return () => {};
  }, [triggerEffect]);

  return (
    <>
      {/* Encabezado */}
      <th className="bg-[#98cfba] w-40 h-25  rounded-l-lg rounded-r-none font-semibold">
        ONLY WHEN I NEED IT
        <img
          className="items-center justify-center mx-auto mb-auto w-20 h-20"
          src={pastillas}
        ></img>
      </th>

      {/* Nombre de medicamentos */}
      <td className="bg-[#c9fbeb]  w-40 h-fit  border-r-2 ">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id_medicamento}>
              {medicamento.nombre_medicamento}
            </h2>
          ))
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>

      {/*Dosis*/}
      <td className="bg-[#98cfba]  w-40 h-fit border-r-2  text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id_medicamento}>{medicamento.dosis}</h2>
          ))
        ) : (
          <p>CARGANDO DATOS...</p>
        )}
      </td>

      {/*Tiempo - hora programada*/}
      <td className="bg-[#c9fbeb] w-40 h-24 border-r-2">
        <td className="bg-[#c9fbeb]  w-40 h-fit text-center">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id_medicamento}>N/A</h2>
            ))
          ) : (
            <p>CARGANDO DATOS...</p>
          )}
        </td>
      </td>

      <td className="bg-[#98cfba] w-40 h-24 border-r-2 text-center">
        <td className="bg-[#98cfba]  w-40 h-fit ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id_medicamento}>SI ES NECESARIO</h2>
            ))
          ) : (
            <p>CARGANDO DATOS...</p>
          )}
        </td>
      </td>

      {/*Comentarios*/}
      <td className="bg-[#c9fbeb]  w-60 h-fit border-r-2">
        <h2 className="h-30 ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id_medicamento}>
                {medicamento.comentarios}
              </h2>
            ))
          ) : (
            <p>CARGANDO DATOS...</p>
          )}
        </h2>
      </td>

      {/* Botón TERMINADO */}
      <td className=" bg-[#98cfba]  w-40 h-10 rounded-r-lg rounded-l-none">
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

export default Necessary;
