import { createBrowserRouter, RouterProvider } from "react-router-dom";

// RUTAS
import Login from "./pages/Login";
import Registros from "./pages/Registros";
import TablaMedicamentos from "./pages/TablaMedicamentos";
import "./index.css";
import { ContextoContextProvider } from "./Hook/MedicationContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registros />,
  },
  {
    path: "/TablaMedicamentos",
    element: <TablaMedicamentos />,
  },
]);

function App() {
  return (
    <>
      <ContextoContextProvider>
        <div>
          <body>
            <RouterProvider router={router} />
          </body>
        </div>
      </ContextoContextProvider>
    </>
  );
}

export default App;
