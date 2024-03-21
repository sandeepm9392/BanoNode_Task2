const Post = require("../models/post.js");
const { createError } = require("../middleware/error.js");

// create a new post
const addPost = async (req, res, next) => {
    console.log("user id of the request", req.user.id)
    const newPost = new Post({ userId: req.user.id, ...req.body });
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        next(err);
    }
};


// update a post
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, "Post not found"))
        if (req.user.id === post.userId) {
            const updatedpost = await Post.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedpost)

        } else {
            res.status(403).json("You can only update your post")
        }
    } catch (err) {
        res.status(400).json({error:err.message})
    }
};

// delete a post
const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, "post not found"))
        if (req.user.id === post.userId) {

            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json("post is deleted");
        } else {
            res.status(403).json({message:"You can only delete your post..sign in to diff acct "})
        }
    } catch (err) {
        res.status(500).json({error:err.message})
    }
};

// get a post by id
const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
};
//get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.aggregate([{ $sample: { size: 20 } }]);
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({error:err.message})
    }
};

//like a post
const likePost = async (req, res, next) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            $inc: { likes: 1 },
        })
        res.status(200).json("The post is liked")
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}

//comment a post
const commentPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, "Post not found"));

        await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: req.body.comment }
        });
        res.status(200).json({ message: "Comment added successfully" });
    } catch (err) {
        res.status(500).json({error:err.message})
    }
};

module.exports = { addPost, updatePost, deletePost, getPost, getAllPosts, likePost, commentPost };
