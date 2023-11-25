// Importación de estilos y bibliotecas necesarias
import "react-toastify/dist/ReactToastify.css";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// Creación del contexto
export const ContextoContext = createContext();

// Función para utilizar el contexto
export const useContexto = () => {
  const context = useContext(ContextoContext);
  // Si no se encuentra un contexto, se arroja un error
  if (!context) {
    throw new Error();
  }
  return context;
};

// Proveedor del contexto
export const ContextoContextProvider = ({ children }) => {
  // Estados para los medicamentos, un disparador y un resultado
  const [medicamentos, setMedicamentos] = useState([]);
  const [triggerEffect, setTriggerEffect] = useState(true);
  const [resultado, setResultado] = useState("");

  // Estado inicial para un medicamento
  const estadoInicial = {
    nombre: "",
    dosis: "",
    dias: "",
    horasP: "",
    comentarios: "",
    Si_es_necesario: false,
  };

  // Función para marcar un medicamento como tomado
  const handleTime = (id) => {
    axios
      .put(`http://localhost:8082/api/hora/${id}`)
      .then((response) => {
        // Actualiza el estado de los medicamentos marcando el medicamento como tomado
        const updatedMedicamentos = medicamentos.map((medicamento) =>
          medicamento.id === id
            ? { ...medicamento, hasTaken: true }
            : medicamento
        );
        setMedicamentos(updatedMedicamentos);
        // Activa un cambio en el disparador para forzar una actualización
        setTriggerEffect((prev) => !prev);
      })
      .catch((error) => console.error("ERROR A REALIZAR PUT", error));
  };

  // Función para eliminar un medicamento
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8082/api/eliminar/${id}`)
      .then((response) => {
        // Elimina el medicamento del estado de los medicamentos
        setMedicamentos(
          medicamentos.filter((medicamento) => medicamento.id !== id)
        );
        // Activa un cambio en el disparador para forzar una actualización
        setTriggerEffect((prev) => !prev);
      })
      .catch((error) => {
        console.error("ERROR AL ELIMINAR MEDICAMENTO", error);
      });
  };

  // Proporciona los valores y funciones definidas en el contexto a los componentes hijos
  return (
    <ContextoContext.Provider
      value={{
        medicamentos,
        setMedicamentos,
        handleTime,
        handleDelete,
        setTriggerEffect,
        triggerEffect,
      }}
    >
      {children} {/* Renderiza los componentes hijos */}
    </ContextoContext.Provider>
  );
};
