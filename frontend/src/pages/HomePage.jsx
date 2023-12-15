import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import '../styles/homeStyles.css';
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment,setNewComment] = useState("");
  const { auth } = useContext(AuthContext); 
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  
  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comment/${commentId}`, {
        method: "DELETE",
        headers: {
          authorization: auth?.token,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      // Actualizar la lista de comentarios después de borrar
      getComments();
      alert("Comentario eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar el comentario", error.message);
    }
  };

  //peticion para crear un nuevo comentario
  const createNewComment = async (postId) => {
    const userId = auth.user._id;
    const user = auth.user.username;
    const avatarURL = auth.user.avatarURL;
    try {
      const response = await fetch(`${API_URL}/comment/${postId}`, {
        method: "POST",
        headers: {
          authorization: auth?.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user:user, autor: userId, description: newComment, avatarURL: avatarURL }), 
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      // const responseData = await response.json();
      await response.json();
      alert("Comentario creado con éxito");
      setNewComment("");
      getComments();
      // console.log(responseData);
    } catch (error) {
      console.error("Error al crear el comentario", error.message);
    }
  };

  const editComment = async (commentId, updatedDescription) => {
    try {
      const response = await fetch(`${API_URL}/comment/${commentId}`, {
        method: "PUT",
        headers: {
          authorization: auth?.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: updatedDescription }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      setEditedCommentText("")
      getComments(); // Actualizar la lista de comentarios después de editar
      alert("Comentario editado con éxito");
    } catch (error) {
      console.error("Error al editar el comentario", error.message);
    }
  };
  
  //peticion para traer todos los comentarios
  const getComments = useCallback(() => {
    fetch(`${API_URL}/comment`, {
    headers: {
      authorization: auth?.token,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => setComments(data))
    .catch((error) => console.error(error.message));
  }, [auth?.token]);

  //peticion para traer todos los posteos
  const getPosts = useCallback(() => {
    fetch(`${API_URL}/post`, {
      headers: {
        authorization: auth?.token,
      },
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => setPosts(data))
    .catch((error) => console.error(error.message));
  }, [auth?.token]);

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/post/${postId}`, {
        method: "DELETE",
        headers: {
          authorization: auth?.token,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      // Actualizar la lista de posts después de borrar
      getPosts();
      alert("Post eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar el post", error.message);
    }
  };

  useEffect(() => {
    getPosts();
    getComments();
  }, [getPosts, getComments]);

  return (
    <div style={{ background: "black" }}>
    <div className="containerHome mw-80 mh-60">
      <div>barra de búsqueda</div>
      {/*seccion de los posteos*/}
      <div className="containerPostComment">
        {posts && posts.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            {posts.map((post) => (
              <li key={post._id} style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', padding: '15px' }}>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: "space-between" }}>
                  <div className="d-flex">
                    <img src={post.autor.avatarURL} alt="imagen perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}/>
                    <p>{post.autor.username}</p>
                  </div>
                  {auth?.user._id === post.autor?._id && (   
                   <div className="">
                     <button onClick={() => deletePost(post._id)} className="btn btn-danger btn-sm m-2">
                       <i className="bi bi-trash-fill me-1"></i>
                     </button>
                     <Link to={`/update/${post._id}`} className="btn btn-primary btn-sm ml-2">
                       <i className="bi bi-pencil-fill me-1"></i>
                     </Link>
                 </div>
                    )}
                </div>
                <p>Titulo: {post.title}</p>
                <img src={post.imageURL} alt="foto" style={{ width: '100%', marginBottom: '10px' }}/>
                <p>Descripción: {post.description}</p>
                <br />
                {/* SECCION DE LOS COMENTARIOS */}
                <div className="containerComment">
                  <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>Comentarios:</p>
                  <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                    {comments.filter((comment) => comment.post === post._id).map((comment) => (
                      <li key={comment._id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <img
                            src={comment.autor.avatarURL}
                            alt="imagen perfil"
                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}/>
                          <span style={{ fontWeight: 'bold' }}>{comment.autor.username}:</span>
                          {auth?.user._id === comment?.autor._id ? (
                            <>
                              {editingCommentId !== comment._id ? (
                                <>
                                  <span style={{ marginLeft: '10px' }}>{comment.description}</span>
                                  <button
                                    onClick={() => setEditingCommentId(comment._id)}
                                    className="btn btn-link btn-sm ml-2">
                                  <i className="bi bi-pencil-fill me-1"></i>
                                  </button>
                                </>
                              ) : (
                                <div style={{ marginTop: '10px' }}>
                                  <input
                                    type="text"
                                    value={editedCommentText}
                                    onChange={(e) => setEditedCommentText(e.target.value)}
                                    className="form-control"/>
                                  <button
                                    onClick={() => {
                                      editComment(comment._id, editedCommentText);
                                      setEditingCommentId(null); // Cerrar el campo de edición
                                    }}
                                    className="btn btn-primary btn-sm mt-2">
                                    Guardar Cambios
                                  </button>
                                  <button
                                    onClick={() => setEditingCommentId(null)} // Agregado: cerrar el campo de edición sin guardar
                                    className="btn btn-link btn-sm mt-2 ml-2">
                                    Cancelar
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <span style={{ marginLeft: '10px' }}>{comment.description}</span>
                          )}
                          {auth?.user._id === comment?.autor._id && (
                            <button
                              onClick={() => deleteComment(comment._id, comment.autor._id)}
                              className="btn btn-link btn-sm ml-2 text-danger">
                              <i className="bi bi-trash-fill me-1"></i>
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* SECCION DE CREACION DE COMENTARIO */}
                <div className="containerComment">
                  <label htmlFor="comments">Añade un comentario:</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      name="comments"
                      placeholder="Escribe tu comentario..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="form-control me-2" />
                    <button onClick={() => createNewComment(post._id)} className="btn btn-primary">
                      Publicar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : ( 
          <p>No hay posteos disponibles.</p>
          )}
      </div>
    </div>
    </div>
  );
};

export default HomePage;