import { useContext } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const FormPost = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPost = new FormData(e.target);
    const title = formPost.get("title");
    const description = formPost.get("description");
    const imageURL = formPost.get("imagen");
    const post = {
      title,
      description,
      imageURL,
    };
    try {
      const response = await fetch(`${API_URL}/post/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: auth?.token,
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      alert("Post creado con éxito");
    } catch (error) {
      console.error("Error al crear el post", error.message);
    } finally {
      setTimeout(() => {
        navigate("/home", { replace: true });
    }, 1000);
    }
  };

  return (
    <div className="vh-100 vw-100"  style={{ backgroundColor: "black" }}>
      <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center p-4 justify-content-center">
      <div
        className="m-4 p-5"
        style={{ border: "1px solid black", borderRadius: "10px" }}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label text-white">
            Título
          </label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="titulo"
            placeholder="Ingrese el título" />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label text-white">
            Descripción
          </label>
          <textarea
            name="description"
            className="form-control"
            id="descripcion"
            placeholder="Ingrese la descripción"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label text-white">
            Imagen
          </label>
          <input
            name="imagen"
            type="text"
            className="form-control"
            id="imagen"
            placeholder="URL de la imagen" />
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </div>
    </form>
    </div>
  );
};

export default FormPost;
