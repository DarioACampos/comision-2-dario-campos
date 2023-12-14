import Post from "../models/postModel.js";

export const ctrlCreatePost = async (req, res) => {
    // console.log(req.body.description);
    const { title, description, imageURL } = req.body;
    const userId = req.user.id;
    try {
        const newPost = new Post({
            title,
            description,
            autor: userId,
            comments: [],
            imageURL
        });
        // console.log(newPost);
       const post = await newPost.save();
       return res.status(201).json({post, message: "post created successfuly"});
    } catch (error) {
        return res.status(500).json({ message: "error created post", error: error.message})
    }
}

export const ctrlGetAllPost = async (req, res) => {

    try {
        const allPost = await Post.find()
        .populate("autor", "email username avatarURL _id")
        .populate("comments",  "autor description _id")
        return res.status(201).json(allPost);
    } catch (error) {
        return res.status(500).json({ message: "Error no se encontraron los posteos", error: error.message })
    }
}

export const ctrlGetPost = async () => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId)
        .populate("autor", "email username avatarURL _id")
        .populate("comment", "autor description _id");
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado"});
        }
        return res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "error al encontrar el post", error: error.message })
    }
}

export const ctrlDeletePost = async(req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post no encontrado" });
        }
        return res.status(201).json({ message: "Post eliminado con exito", deletedPost });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Error al eliminar el post"})
    }
}

export const ctrlUpdatePost= async(req, res)=> {
    const postId = req.params.id;
    const { title, comments, imageURL } = req.body;

    try {
        const updatePost = await Post.findByIdAndUpdate(postId, {
            title,
            comments,
            imageURL,
        });
        if (!updatePost) {
            return res.status(404).json({ error: "Post no encontrado "}); 
        }
        return re. status(201).json({ message: "Post actualizado con exito", updatePost });
    }catch (error) {
        return res.status(500).json({ error: error.message, message: "Error alactualizar el Post"});
    }
}