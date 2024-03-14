const Post = require("../models/post.js");
const createError = require("../middleware/error.js");

// create a new post
const addPost = async (req, res, next) => {
    const newPost = new Post({ userId: req.user_id, ...req.body });
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
        const updatedpost = await Post.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedpost);
    } catch (err) {
        next(err);
    }
};

// delete a post
const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return next(createError(404, "post not found"))

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json("post is deleted");
    } catch (err) {
        next(err);
    }
};

// get a post by id
const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    } catch (err) {
        next(err);
    }
};
//get all posts
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([{ $sample: { size: 20 } }]);
        res.status(200).json(posts)
    } catch (err) {
        next(err);
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
        next(err)
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
        next(err);
    }
};

module.exports = { addPost, updatePost, deletePost, getPost, getAllPosts, likePost, commentPost };
