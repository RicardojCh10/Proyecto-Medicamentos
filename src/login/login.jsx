// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const navigate = useNavigate();

//   const [datos, setDatos] = useState({
//     email: "",
//     contrasena: "",
//     autenticado: false,
//     user: "",
//   });

//   const [error, setError] = useState("");

//   useEffect(() => {
//     const status = localStorage.getItem("Status");
//     const email = localStorage.getItem("email");
//     const user = localStorage.getItem("user");
//     if (status === "true") {
//       setDatos({ ...datos, autenticado: true, email });
//     }
//   }, []);

//   useEffect(() => {
//     console.log(datos.autenticado);
//     localStorage.setItem("email", datos.email);
//     localStorage.setItem("Status", datos.autenticado);
//     localStorage.setItem("user", datos.user);
//   }, [datos.autenticado, datos.email, datos.user]);

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!datos.email.trim() || !datos.contrasena.trim()) {
//       setError("Por favor, complete todos los campos.");
//       return;
//     }

//     axios
//       .post("http://localhost:8082/login", datos)
//       .then((respuesta) => {
//         if (respuesta.status === 200) {
//           console.log(respuesta.data[0].id);
//           setDatos({ ...datos, autenticado: true, user: respuesta.data[0].id });

//           console.log("Bien del front");
//         } else {
//           setError("Credenciales incorrectas, inténtalo de nuevo");
//         }
//       })
//       .catch((error) => {
//         console.error("Error al iniciar sesión: " + error);
//         setError("Credenciales incorrectas.");
//       });
//   };

//   const cerrarSesion = () => {
//     localStorage.clear();
//     setDatos({ ...datos, autenticado: false });
//   };

//   if (datos.autenticado) {
//     navigate("/medicationTable");
//     return null;
//   }

//   return !datos.autenticado ? (
//     <form
//       onSubmit={handleLogin}
//       style={{
//         backgroundImage:
//           'url("https://m.media-amazon.com/images/I/51F54yNB4DL._AC_SL1000_.jpg")',
//       }}
//     >
//       <h2 className="w-full flex-col text-center text-black  text-4xl p-5">
//         Inicie sesion
//       </h2>
//       <main className="h-fit flex">
//         <div className="bg-white rounded-sm p-2 w-[50%] mx-auto h-[90%] border-x-2 border-b-4 border-t flex items-center flex-wrap py-20">
//           <div className="flex flex-wrap w-full gap-6">
//             <div className="flex flex-col items-center justify-center w-full">
//               <label className="text-md w-[50%] p-1.5">email:</label>
//               <input
//                 className="border-black border rounded-sm px-2 py-[.5%] w-[50%]"
//                 type="email"
//                 placeholder="ejemplo@gmail.com"
//                 name="email"
//                 value={datos.email}
//                 onChange={(e) => {
//                   setDatos({ ...datos, email: e.target.value });
//                 }}
//               />
//             </div>
//             <div className="flex flex-col items-center justify-center w-full">
//               <label className="text-md w-[50%] p-1.5">Contraseña:</label>
//               <input
//                 className="border-black border rounded-sm px-2 py-[.5%] w-[50%]"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="**"
//                 name="contrasena"
//                 value={datos.contrasena}
//                 onChange={(e) => {
//                   setDatos({ ...datos, contrasena: e.target.value });
//                 }}
//               />
//               {showPassword ? (
//                 <RiEyeOffLine
//                   onClick={handleShowPassword}
//                   className="absolute mr-[-21.5%] mt-[4%] -translate-y-1/2 hover:cursor-pointer"
//                 />
//               ) : (
//                 <RiEyeLine
//                   onClick={handleShowPassword}
//                   className="absolute mr-[-21.5%] mt-[4%] -translate-y-1/2 hover:cursor-pointer"
//                 />
//               )}
//             </div>
//             <div className="text-center justify-center w-full">
//               <button
//                 type="submit"
//                 className="bg-black rounded-sm  w-[40%] py-2 transition-all duration-300 ease-in-out hover:bg-sky-700  text-white"
//               >
//                 Inicie sesion
//               </button>
//             </div>

//             <div className="text-center justify-center w-full flex flex-wrap ">
//               <div className="w-full ">
//                 {error && <span className="text-red-500">{error}</span>}
//               </div>
//             </div>
//             <div className=" flex justify-center w-full">
//               <h3>¿No has creado una cuenta? </h3>
//               <Link to="/singup">
//                 <span className="text-sky-700 mx-2 ">Registrese</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </main>
//     </form>
//   ) : (
//     navigate("/")
//   );
// }

// export default Login;
