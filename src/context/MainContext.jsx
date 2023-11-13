import 'react-toastify/dist/ReactToastify.css';
import {  createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'

export const ContextoContext = createContext()

export const useContexto = () => {
    const context = useContext(ContextoContext)
    if(!context){
        throw new Error('useContexto debe estar dentro de los limites de ContextoContextProvider, y si, hice mi propio hook.')
    }
    return context
}

export const ContextoContextProvider = ({children}) => {

    const [medicamentos, setMedicamentos] = useState([]);
    const [triggerEffect, setTriggerEffect] = useState(true);
    const [resultado, setResultado] = useState('');

    const estadoInicial = ({
        nombre: '',
        dosis: '',
        dias: '',
        horasP: '',
        comentarios: '',
        SoloNecesario: false,
      });

    const handleTime = (id) => {
        axios
          .put(`http://localhost:8082/api/hora/${id}`)
          .then((response) => {
           
            const updatedMedicamentos = medicamentos.map((medicamento) =>
              medicamento.id === id
                ? { ...medicamento, hasTaken: true }
                : medicamento
            );  
            setMedicamentos(updatedMedicamentos);
            setTriggerEffect((prev) => !prev);
          })
          .catch((error) =>
            console.error('Error al realizar la solicitud PUT', error)
          );
      };
    
      const handleDelete = (id) => {
        axios.delete(`http://localhost:8082/api/eliminar/${id}`)
        .then((response) => {
          setMedicamentos(medicamentos.filter((medicamento) => medicamento.id !== id));
          setTriggerEffect((prev) => !prev);
        })
        .catch((error) => {
          console.error('Error deleting medication', error);
        });
      }

    




   return(
    <ContextoContext.Provider value={{ medicamentos, setMedicamentos, handleTime, handleDelete,setTriggerEffect, triggerEffect}} >
        {children}
    </ContextoContext.Provider>
   )
}