import React,{ useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Perfiles({abierto, setAbierto}){

  const [formularioData, setFormularioData] = useState(estadoInicial);
  const [resultado, setResultado] = useState('');

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
    console.log('formularioData.comentarios:', formularioData.comentarios);
    const comentarios = formularioData.comentarios.trim() === '' ? 'Sin comentarios adicionales' : formularioData.comentarios;
    console.log('comentarios:', comentarios);
    const formDataFinal = {
      ...formularioData,
      comentarios,
    };
    // Realizar una solicitud POST con Axios
    axios.post('http://localhost:8082/api/agregar', formDataFinal)
      .then(response => {
        setResultado(response.data);
        setAbierto(false)
        setFormularioData(estadoInicial)
        toast.success('Medicamento agregado :)');
      })
      .catch(error => {
        setResultado('Error al enviar el formulario');
      });
  };

  return (
    abierto&& (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5 h-2/2 w-3/2 relative">
          <p className="w-80 text-center text-2xl ">Nuevo Producto:</p>
          
          <div className='flex flex-col items-center justify-center w-full'>
         <label className='text-md w-[60%] p-0.5'>Nombre:</label>
          <input className='border-[#159D95] border rounded-lg px-2 py-[.5%] w-[60%] '
          type='text'
          placeholder='Nombre del producto'

          name="nombre" 
          value={formularioData.nombre} 
          onChange={handleInputChange}
          />
         </div>

         <div className='flex flex-col items-center justify-center w-full'>
         <label className='text-md w-[60%] p-0.5'>Dosis:</label>
          <input className='border-[#159D95] border rounded-lg px-2 py-[.5%] w-[60%] '
          type='text'
          placeholder='Dosis del producto'

          name='dosis'
          value={formularioData.dosis}
          onChange={handleInputChange}
          />
         </div>

         <div className='flex flex-col items-center justify-center w-full'>
         <div className='flex'>
         </div>
         
         <div className="flex w-full justify-center gap-8">
         <div className='flex flex-col items-center justify-center w-[26%]'>
         <label className='text-md w-[100%] p-0.5'>Horas entre cada dosis:</label>
          <input className='border-[#159D95] border rounded-lg px-2 py-[.5%] w-[100%] '
          type='text'
          placeholder='8'

          name='horasP'
          value={formularioData.horasP}
          onChange={handleInputChange}
          />
         </div>
         <div className='flex flex-col items-center justify-center w-[26%]'>
         <label className='text-md w-[100%] p-0.5'>Durante:</label>
          <input className='border-[#159D95] border rounded-lg px-2 py-[.5%] w-[100%] '
          type='text'
          placeholder='5 dias'

          name='tomas'
          value={formularioData.tomas}
          onChange={handleInputChange}
          />
        </div>
         </div>
         <div className='flex flex-col items-center justify-center w-[60%] '>
         <label className='text-md w-[100%] p-0.5'>Comentarios:</label>
          <textarea className='border-[#159D95] border rounded-lg px-2 py-[.5%] w-[100%]'
          type='text'
          placeholder='Tomar antes de...'

           name='comentarios'
           value={formularioData.comentarios}
           onChange={handleInputChange}
          />
         </div>
         </div>
         <h5>¿Solo cuando sea necesario?
           <input 
           className='ml-2' 
           type="checkbox"

           name='SoloNecesario'
           value={formularioData.SoloNecesario}
           onChange={handleInputChange}
           
           ></input> 
          </h5>
          <div className="w-3/4 flex justify-center">
            <button className="bg-white m-5 px-2 border border-slate-500 rounded-md w-4/12" onClick={() => {setAbierto(false)}}>
              Cancelar
            </button>
            <button className="text-white bg-cyan-500  m-5 px-2 border border-slate-500 rounded-md w-4/12" onClick={handleSubmit}>
              Agregar
            </button>
          </div>
        </div>
      </div>
     )
  )
}

export default Perfiles
