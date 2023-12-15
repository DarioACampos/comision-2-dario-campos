import { API_URL } from "../utils/consts";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  // console.log(posts);
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const profileResponse = await fetch(`${API_URL}/user/profile`, { headers: { authorization: auth?.token } });
      if (!profileResponse.ok) {
        throw new Error(`Error: ${profileResponse.status} - ${profileResponse.statusText}`);
      }
      const profileData = await profileResponse.json();
      setProfile(profileData);

      const postsResponse = await fetch(`${API_URL}/post`, { headers: { authorization: auth?.token } });
      if (!postsResponse.ok) {
        throw new Error(`Error: ${postsResponse.status} - ${postsResponse.statusText}`);
    }
      const postsData = await postsResponse.json();
      setPosts(postsData);

      const commentsResponse = await fetch(`${API_URL}/comment`, { headers: { authorization: auth?.token } });
      if (!commentsResponse.ok) {
        throw new Error(`Error: ${commentsResponse.status} - ${commentsResponse.statusText}`);
      }
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, [auth?.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const myPosts = posts.filter((post) => post.autor._id === profile?.id);

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comment/${commentId}`, { method: "DELETE", headers: { authorization: auth?.token } });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      fetchData(); // Actualizar la lista de comentarios después de borrar
      alert("Comentario eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar el comentario", error.message);
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
      fetchData(); // Actualizar la lista de comentarios después de editar
      alert("Comentario editado con éxito");
    } catch (error) {
      console.error("Error al editar el comentario", error.message);
    }
  };

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
      fetchData();
      alert("Post eliminado con éxito");
    } catch (error) {
      console.error("Error al borrar el post", error.message);
    }
  };

  return (
  <div style={{ background: "black" }}>
    <div className="container" >
      <div className="row">
        <div className="col-md-6" >
          <h1 style={{ color: "red" }}>Mi perfil</h1>
          {profile && (
            <div className="card">
              <img src={profile.avatarURL} alt="Avatar" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Nombre: {profile.username}</h5>
                <p className="card-text">Email: {profile.email}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6" >
          <h2 style={{ color: "red" }}>Mis posteos</h2>
          {myPosts && myPosts.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0, background: "#f0f0f0" }}>
              {/* seccion posteos */}
              {myPosts.map((post) => (
                <li key={post._id} style={{ border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px', padding: '15px' }} >
                  <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', justifyContent: "space-between" }}>
                  <div className="d-flex">
                    <img src={post.autor.avatarURL} alt="imagen perfil" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}/>
                    <p>{post.autor.username}</p>
                  </div>
                  {auth?.user._id === post.autor?._id && (
                    <div className="d-flex justify-content-between">
                        <button onClick={() => deletePost(post._id)} className="btn btn-danger btn-sm m-1" >
                            <i className="bi bi-trash-fill me-1"></i>
                        </button>
                      <div className="ms-auto">
                        <Link to={`/update/${post._id}`} className="btn btn-primary btn-sm ml-2 m-1">
                            <i className="bi bi-pencil-fill me-1"></i>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                  <h5 className="mb-1">{post.title}</h5>
                  <img src={post.imageURL} alt="Foto" style={{ width: '100%', marginBottom: '10px' }} />
                  <p className="mb-1">Descripción: {post.description}</p>
                  <div className="containerComment mt-3">
                    {/* seccion comentarios */}
                    <strong>Comentarios:</strong>
                    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                      {comments
                        .filter((comment) => comment.post === post._id)
                        .map((comment) => (
                          <li key={comment._id} style={{ marginBottom: '10px' }}>
                            <div className="comment-container d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <img
                                  src={comment.autor.avatarURL}
                                  alt="imagen perfil"
                                  className="avatar-img"
                                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }} />
                                <span className="comment-author">{comment.autor.username}:</span>
                                {editingCommentId === comment._id ? (
                                  <div className="edit-comment-container">
                                    <input
                                      type="text"
                                      value={editedCommentText}
                                      onChange={(e) => setEditedCommentText(e.target.value)}
                                      className="form-control" />
                                    <button
                                      onClick={() => {
                                        editComment(comment._id, editedCommentText);
                                        setEditingCommentId(null); // Cerrar el campo de edición
                                      }}
                                      className="btn btn-primary btn-sm mt-2">
                                      Guardar Cambios
                                    </button>
                                    <button
                                      onClick={() => setEditingCommentId(null)}
                                      className="btn btn-link btn-sm mt-2 ml-2">
                                      Cancelar
                                    </button>
                                  </div>
                                ) : (
                                  <span className="comment-text">{comment.description}</span>
                                )}
                              </div>
                              {auth?.user._id === comment?.autor._id && (
                                <div className="comment-actions">
                                  {!editingCommentId && (
                                    <button
                                      onClick={() => setEditingCommentId(comment._id)}
                                      className="btn btn-link btn-sm">
                                      <i className="bi bi-pencil-fill me-1"></i>
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteComment(comment._id)}
                                    className="btn btn-link btn-sm text-danger">
                                    <i className="bi bi-trash-fill me-1"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
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
  </div>
  );
};

export default Profile;
