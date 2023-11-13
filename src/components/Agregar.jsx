import React,{ useState, useEffect } from 'react'
import axios from 'axios'

import { useContexto } from '../context/MainContext';

function Agregar({abierto, setAbierto}){

  const estadoInicial = ({
    nombre: '',
    dosis: '',
    dias: '',
    horasP: '',
    comentarios: '',
    SoloNecesario: false,
  });
  const [formularioData, setFormularioData] = useState(estadoInicial);
  const [resultado, setResultado] = useState('');
  const {triggerEffect, setTriggerEffect} = useContexto()


  const [medicamentos, setMedicamentos] = useState([]);

  // Luego, puedes usar useEffect para cargar la lista de medicamentos cuando el componente se monte
  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://localhost:8082/listaMedicamentos', {
          params: {
            user: localStorage.getItem('user')
          }
        });
        setMedicamentos(response.data.medicamentos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMedicamentos();
  }, [triggerEffect]);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Si el campo es un campo de entrada de tipo "checkbox", manejamos su estado de manera diferente
    if (type === 'checkbox') {
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
  
  

    const comentarios = formularioData.comentarios.trim() === '' ? 'Sin comentarios' : formularioData.comentarios;
  
    const formDataFinal = {
      ...formularioData,
      comentarios,
    };
  
    axios
      .post('http://localhost:8082/api/agregar', formDataFinal, {
        params: {
          user: localStorage.getItem('user'),
        },
      })
      .then((response) => {
        setResultado(response.data);
        setAbierto(false);
        setFormularioData(estadoInicial);

        setTriggerEffect((prev) => !prev);
      })
      .catch((error) => {
        setResultado('Error al enviar el formulario');
      });
  };
  
  return (
    
        <div>
        <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5 h-2/2 w-3/2 relative">
          <p className="w-80 text-center text-2xl ">Agregar medicamento</p>
          
          <div className='flex flex-col items-center justify-center w-full'>
         <label className='text-md w-[60%] p-0.5'>Nombre del medicamento:</label>




         {/* Inicio del select */}
         
         <select
            className="border text-center w-[60%] border-black rounded-sm px-2 py-1 custom-select"
            value={formularioData.nombre}
            onChange={handleInputChange}
            name="nombre"
          >

            <option value="" disabled selected > Elija una opcion </option>

            {medicamentos ? (
          medicamentos.map((medicamento, index) => (
            <option key={index} value={medicamento.nombre}>{medicamento.nombre}</option>
          ))
        ) : (
          <p>Loading...</p>
        )}

          </select>



          {/* Final del select */}




         </div>

         <div className='flex flex-col items-center justify-center w-full'>
         <label className='text-md w-[60%] p-0.5'>Dosis de la medicina:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[60%] '
          type='text'
          placeholder='2 pastillas - 2 inyecciones'
          

          name='dosis'
          value={formularioData.dosis}
          onChange={handleInputChange}
          />
         </div>

         <div className='flex flex-col items-center justify-center w-full'>
         <div className='flex'>
         </div>
         
         <div className="flex w-full justify-center gap-8 ">
         <div className='flex flex-col items-center justify-center w-[32%]'>
         <label className='text-md w-[100%] '>Horas entre cada tomada:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[100%] '
          type='number'
          placeholder='8'
          min='0'

          name='horasP'
          value={formularioData.horasP}
          onChange={handleInputChange}
          />
         </div>
         <div className='flex flex-col items-center  justify-center w-[26%]'>
         <label className='text-md w-[100%] p-0.5'>Dias de la prescripcion:</label>
          <input className='border-black border rounded-sm px-2 py-[.5%] w-[100%] '
          type='number'
          placeholder='5'
          min='0'

          name='dias'
          value={formularioData.dias}
          onChange={handleInputChange}
          
          />
        </div>
         </div>
         <div className='flex flex-col items-center justify-center w-[60%] '>
         <label className='text-md w-[100%] p-0.5'>Comentarios / Anotaciones:</label>
          <textarea className='border-black border rounded-sm px-2 py-[.5%] w-[100%]'
          type='text'
          placeholder='Tomar antes de...'

           name='comentarios'
           value={formularioData.comentarios}
           onChange={handleInputChange}
          />
         </div>
         </div>
         <h5>¿Es este medicamento de toma solo cuando sea necesario?
           <input 
           className='ml-2' 
           type="checkbox"

           name='SoloNecesario'
           value={formularioData.SoloNecesario}
           onChange={handleInputChange}
           
           ></input> 
          </h5>
          <div className="w-3/4 flex justify-center">

            <button className="text-white bg-black  m-5 py-2 px-4  border border-slate-500 rounded-md w-6/12" onClick={handleSubmit}>
              Agregar
            </button>
          </div>
        </div>
      </div>
     )
  
}

export default Agregar
