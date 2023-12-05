import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-route-dom";
import AppRouter from "./AppRouter.jsx";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </AuthProvider>
 );
