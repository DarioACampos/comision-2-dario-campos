import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);
    const { postId } = useParams();

    const [isUpdating, setIsUpdating] = useState(false);
    const [post, setPost] = useState({});
    console.log(post);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedImage, setEditedImage] = useState("");


    const getPostById = useCallback(async () => {
      
        try {
          const response = await fetch(`${API_URL}/post/${postId}`, {
            headers: {
              authorization: auth?.token,
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          const data = await response.json();
          setPost(data);
          setEditedTitle(data.title);
          setEditedDescription(data.description);
          setEditedImage(data.imageURL)
        } catch (error) {
          console.error("Error fetching post details", error.message);
        }
      }, [auth?.token, postId]);
      

      const handleUpdatePost = async () => {
        try {
          setIsUpdating(true);
          const response = await fetch(`${API_URL}/post/${postId}`, {
            method: "PUT",
            headers: {
              authorization: auth?.token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: editedTitle,
              description: editedDescription,
              imageURL: editedImage,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
          alert("Post actualizado con éxito");
        } catch (error) {
          console.error("Error al actualizar el post", error.message);
        } finally {
          setIsUpdating(false);
          setEditedTitle("");
          setEditedDescription("");
          setEditedImage("");
          //tiempo extra para poder vaciar los inputs
          setTimeout(() => {
            navigate("/home", { replace: true });
        }, 1000);
        }
      };

  useEffect(() => {
    getPostById();
  }, [getPostById])
  
    return (
        <div className="vh-100 vw-100"  style={{ backgroundColor: "black" }}>
          <form
          onSubmit={(e) => {
            e.preventDefault(); // Agrega esta línea
            handleUpdatePost();
          }}
          className="d-flex flex-column align-items-center p-4 justify-content-center">
            <div className="m-4 p-5" style={{ border: "1px solid black", borderRadius: "10px" }}>
                <h1 style={{ color: "blue" }}>Editar Post</h1>
                <div className="mb-3">
                <label htmlFor="editedTitle" className="form-label text-white">Nuevo título:</label>
                <input
                    className="form-control"
                    type="text"
                    id="editedTitle"
                    value ={editedTitle}
                    onChange={(e) => {
                        console.log(e.target.value);
                        setEditedTitle(e.target.value);
                    }} />
                </div>
                <div className="mb-3">
                <label htmlFor="editedDescription" className="form-label text-white">Nueva Descripción:</label>
                <textarea
                    className="form-control"
                    id="editedDescription"
                    value ={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)} />
                </div>
                <div className="mb-3">
                <label htmlFor="editedImage" className="form-label text-white">Url de la imagen:</label>
                <input
                    type="text"
                    className="form-control"
                    id="editedImage"
                    value ={editedImage}
                    onChange={(e) => setEditedImage(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isUpdating}>Guardar Cambios</button>
                </div>
        </form>
        </div>
      );
};

export default UpdatePost