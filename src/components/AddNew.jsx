import React, { useState, useEffect } from "react";
import axios from "axios";

import { useContexto } from "../context/MainContext";

function AddNew({ abierto, setAbierto }) {
  const estadoInicial = {
    nombre: "",
    dosis: "",
    dias: "",
    hora: "",
    comentarios: "",
    Si_es_necesario: false,
  };
  const [formularioData, setFormularioData] = useState(estadoInicial);
  const [resultado, setResultado] = useState("");
  const { triggerEffect, setTriggerEffect } = useContexto();

  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/listaMedicamentos",
          {
            params: {
              user: localStorage.getItem("user"),
            },
          }
        );
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicamentos();
  }, [triggerEffect]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      setFormularioData({
        ...formularioData,
        [name]: event.target.checked,
      });
    } else {
      setFormularioData({
        ...formularioData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    const comentarios =
      formularioData.comentarios.trim() === ""
        ? "Sin comentarios"
        : formularioData.comentarios;

    const formDataFinal = {
      nombre_medicamento: formularioData.nombre,
      dosis: formularioData.dosis,
      momento_dia: "Mañana",
      Si_es_necesario: formularioData.Si_es_necesario,
      veces_a_tomar: 3,
      horaVeces_a_tomar: formularioData.hora,
      comentarios: comentarios,
    };

    axios
      .post("http://localhost:8082/api/agregar", formDataFinal)
      .then((response) => {
        setResultado(response.data);
        setAbierto(false);
        setFormularioData(estadoInicial);
        setTriggerEffect((prev) => !prev);
      })
      .catch((error) => {
        setResultado("Error al enviar el formulario");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-100 p-8">
        <h2 className="text-3xl font-bold mb-4">Agregar medicamento</h2>

        <form className="max-w-md bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block mb-2" htmlFor="nombre_medicamento">
              Nombre del medicamento:
            </label>
            <select
              id="nombre_medicamento"
              className="w-full border rounded-md p-2"
              value={formularioData.nombre}
              onChange={handleInputChange}
              name="nombre"
            >
              <option value="" disabled selected>
                {" "}
                Elija una opcion{" "}
              </option>

              {medicamentos ? (
                medicamentos.map((medicamento, index) => (
                  <option key={index} value={medicamento.nombre}>
                    {medicamento.nombre}
                  </option>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="dosis_medicamento">
              Dosis de la medicina:
            </label>
            <input
              id="dosis_medicamento"
              className="w-full border rounded-md p-2"
              type="text"
              placeholder="2 pastillas - 2 inyecciones"
              name="dosis"
              value={formularioData.dosis}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mb-4">
            <div className="w-1/2 mr-2">
              <label className="block mb-2" htmlFor="horas_tomada">
                Horas entre cada tomada:
              </label>
              <input
                id="horas_tomada"
                className="w-full border rounded-md p-2"
                type="number"
                placeholder="8"
                min="0"
                name="hora"
                value={formularioData.hora}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block mb-2" htmlFor="dias_prescripcion">
                Dias de la prescripcion:
              </label>
              <input
                id="dias_prescripcion"
                className="w-full border rounded-md p-2"
                type="number"
                placeholder="5"
                min="0"
                name="dias"
                value={formularioData.dias}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2" htmlFor="comentarios_medicamento">
              Comentarios / Anotaciones:
            </label>
            <textarea
              id="comentarios_medicamento"
              className="w-full border rounded-md p-2"
              type="text"
              placeholder="Tomar antes de..."
              name="comentarios"
              value={formularioData.comentarios}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              ¿Es este medicamento de toma solo cuando sea necesario?
            </label>
            <input
              className="mr-2"
              type="checkbox"
              name="Si_es_necesario"
              checked={formularioData.Si_es_necesario}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNew;