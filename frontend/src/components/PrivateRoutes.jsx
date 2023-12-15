import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Navbar from "./Navbar.jsx";
import Footer from "./footer/Footer.jsx";

function PrivateRoutes() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Verifica si es la carga inicial
    if (initialLoad) {
      // Si es la carga inicial, actualiza el estado de carga y no redirige
      setInitialLoad(false);
    } else {
      // Si no es la carga inicial y auth es null, redirige
      if (auth === null) {
        navigate("/");
      }
    }
  }, [auth, navigate, initialLoad]);

  if (auth === undefined) return <div>Loading...</div>;
  return (
    <div className="layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PrivateRoutes;