import  Comment  from "../models/commentModel.js";
import Post from "../models/postModel.js";
 
export const ctrlCreateComments = async (req, res) => {
    const { autor, description, avatarURL, user } = req.body;

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
           avatarURL,
           user,
        })
        //guardo el nuevo comentario
        const comment = await newComment.save()
        //pusheo el comentario a la seccion de la publi
        existingPost.comments.push(comment._id)
        //guardo el comentario
        await existingPost.save()
        res.status(201).json({ message: "Comentario creado con exito", comment})
    } catch (error) {
        res.status(500).json({ message: "Error al crear el comentario", error: error.message })
    }
}
export const ctrlGetAllComment = async (req, res) => {
    // const userId = req.params.userId;
    try {
        const allComment = await Comment.find()
        .populate("autor", "username avatarURL _id");
        return res.status(201).json(allComment);
    } catch (error) {
        return res.status(500).json({ message: "Error no se encontraron los comentarios", error: error.message })
    }
}

export const ctrlGetComment = async (req, res) => {
    const commentId = req.params.id;

    try {
        const comment = await Comment.findById(commentId)
        .populate("autor", "username avatarURL _id");
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

//! corregir
export const ctrlUpdateComment = async(req, res)=> {
    const commentId = req.params.id;
    console.log(commentId);
    console.log(req.body);
    const { comments } = req.body;
    // Asegúrate de que "comments" sea un array de cadenas
    const updateComment = await Post.findByIdAndUpdate(commentId)
    console.log(updateComment);
    try {
        const updateComment = await Post.findByIdAndUpdate(commentId, {
            _id,
            comments: comments,
        }, { new: true });
        console.log(updateComment);
        if (!updateComment) {
            return res.status(404).json({ error: "Comentario no encontrado" });
        }
    
        return res.status(201).json({ message: "Comentario actualizado con éxito", updateComment });
    } catch (error) {
        return res.status(500).json({ error: error.message, message: "Error al actualizar el comentario" });
    }
}