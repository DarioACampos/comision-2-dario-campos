import  Comment  from "../models/commentModel.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
 
export const ctrlCreateComments = async (req, res) => {
    const { autor, description } = req.body;
    const postId = req.params.id;

    try {
        const existingPost = await Post.findById(postId) 
        if (!existingPost) {
            res.status(404).json({ message: "posteo no encontrado" })
        }
        const newComment = new Comment({
           autor,
           description,
           post: postId,
        })
        const comment = await newComment.save()
        res.status(201).json({ message: "Comentario creado con exito", comment})
    } catch (error) {
        res.status(500).json({ message: "Error al crear el comentario", error: error.message })
    }
}
export const ctrlGetAllComment = async (req, res) => {
    // const userId = req.params.userId;
    try {
        const allComment = await Comment.findById();
        return res.status(201).json(allComment);
    } catch (error) {
        return res.status(500).json({ message: "Error no se encontraron los comentarios", error: error.message })
    }
}

export const ctrlGetComment = async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado"});
        }
        return res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "error al encontrar el comentario", error: error.message })
    }
}

export const ctrlDeleteComment = async(req, res) => {
    const commentId = req.params.id;

    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ error: "comentario no encontrado" });
        }
        return res.status(201).json({ message: "comentario eliminado con exito", deletedComment });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error al eliminar el comentario"})
    }
}

export const ctrlUpdateComment = async(req, res)=> {
    const commentId = req.params.id;
    const { title, comments, imageURL } = req.body;

    try {
        const updateComment = await Post.findByIdAndUpdate(commentId, {
            title,
            comments,
            imageURL,
        });
        if (!updateComment) {
            return res.status(404).json({ error: "comentario no encontrado "}); 
        }
        return re. status(201).json({ message: "comentario actualizado con exito", updateComment });
    }catch (error) {
        return res.status(500).json({ error: error.message, message: "Error alactualizar el comentario"});
    }
}