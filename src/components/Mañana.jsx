import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContexto } from "../context/MainContext";
import morning from "../assets/morning .png";

function Mañana() {
  const [medicamentos, setMedicamentos] = useState([]);
  const { handleDelete, handleTime, triggerEffect } = useContexto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosManana",
          {
            params: { user },
          }
        );
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <th className="bg-[#FF9688] w-40 h-fit border-r-2 font-semibold">
        Mañana
        <img className="w-10 h-10 mb-auto mx-auto" src={morning} />
      </th>
      <td className="bg-[#FF9688] w-40 h-fit border-r-2 ">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id}>{medicamento.nombre}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
      {/*Dosis*/}
      <td className="bg-[#FF9688] w-40 h-fit border-r-2 text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id}>{medicamento.dosis}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>

      {/* Inicio hora */}

      <td className="bg-[#FF9688] border-r-2 w-40 h-fit text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => {
            const currentTime = new Date();

            // Use the current date instead of a fixed date (e.g., 2023-11-10)
            const currentYear = currentTime.getFullYear();
            const currentMonth = currentTime.getMonth() + 1; // Months are zero-based
            const currentDay = currentTime.getDate();

            const horaProgramada = new Date(
              `${currentYear}-${currentMonth}-${currentDay} ${medicamento.hora_programada}`
            );

            // Check if the current time is greater than the scheduled time
            const showButton = currentTime > horaProgramada; //se muestra el boton si ahpra es mayor que la hora programada

            return (
              <h2 key={index} className="h-15">
                {medicamento.hora_programada}
                {showButton && (
                  <button
                    className="ml-2"
                    onClick={() => handleTime(medicamento.id)}
                  >
                    <span className="text-2xl">+</span>
                  </button>
                )}
              </h2>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </td>

      {/* Finalhora */}

      <td className="bg-[#FF9688] w-40 h-24 border-r-2  text-center">
        <td className="bg-[#FF9688]  w-40 h-fit ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id}>{medicamento.fecha_programada}</h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </td>
      </td>
      {/*Comentarios*/}
      <td className="bg-[#FF9688] w-80 h-fit border-r-2">
        <h2 className="h-30">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2
                key={medicamento.id}
                className="w-30"
                style={{
                  backgroundColor: index % 2 === 0 ? "#FF9688" : "#FFBAC7",
                }}
              >
                {medicamento.comentarios}
              </h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </h2>
      </td>
      <td className=" bg-[#FF9688] w-8 h-fit border-r-2">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <button
              className="w-full"
              style={{
                backgroundColor: index % 2 === 0 ? "#FF9688" : "#FFBAC7",
              }}
              onClick={() => handleDelete(medicamento.id)}
            >
              x
            </button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
    </>
  );
}

export default Mañana;
