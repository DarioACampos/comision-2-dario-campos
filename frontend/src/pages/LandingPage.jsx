import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100"
      style={{ minWidth: "100vw", backgroundColor: "black" }}> 
      <Carousel />
      <h1 className="mb-4" style={{ color: "#fd0d0d", fontStyle: "oblique", transform: "skewY(-10deg)" }}>Welcome to Your App</h1>
      <div className="d-flex">
        <Link to="/login" className="btn btn-outline-primary me-2">
          Log In
        </Link>
        <Link to="/register" className="btn btn-outline-danger">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;