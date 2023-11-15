import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContexto } from "../context/MainContext";
import pastillas from "../assets/pastillas.png";

function Necessary() {
  const [medicamentos, setMedicamentos] = useState([]);
  const { handleDelete, triggerEffect } = useContexto();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const response = await axios.get(
          "http://localhost:8082/medicamentosNecesario",
          {
            params: { user },
          }
        );
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {};
  }, [triggerEffect]);

  return (
    <>
      {/*Nombre*/}
      <th className="bg-[#03bb85] w-40 h-fit border-r-2  font-semibold">
        Solo cuando sea necesario
        <img className="w-8 h-8 mb-auto mx-auto" src={pastillas}></img>
      </th>
      <td className="bg-[#68ddbd]  w-40 h-fit  border-r-2 ">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id}>{medicamento.nombre}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
      {/*Dosis*/}
      <td className="bg-[#68ddbd]  w-40 h-fit border-r-2  text-center">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <h2 key={medicamento.id}>{medicamento.dosis}</h2>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </td>
      {/*Tiempo - hora programada*/}
      <td className="bg-[#68ddbd] w-40 h-24 border-r-2">
        <td className="bg-[#68ddbd]  w-40 h-fit text-center">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id}>Cuando se necesite </h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </td>
      </td>

      <td className="bg-[#68ddbd] w-40 h-24 border-r-2 text-center">
        <td className="bg-[#68ddbd]  w-40 h-fit ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id}>Si lo necesito </h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </td>
      </td>
      {/*Comentarios*/}
      <td className="bg-[#68ddbd]  w-80 h-fit border-r-2">
        <h2 className="h-30 ">
          {medicamentos ? (
            medicamentos.map((medicamento, index) => (
              <h2 key={medicamento.id}>{medicamento.comentarios}</h2>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </h2>
      </td>
      <td className=" bg-[#68ddbd]  w-8 h-fit border-r-2">
        {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <button
              className="w-full"
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

export default Necessary;
