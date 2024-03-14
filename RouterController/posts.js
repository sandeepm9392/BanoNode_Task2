const express = require("express");
const { addPost, updatePost, deletePost, getPost, getAllPosts, likePost, commentPost } = require("../controller/post.js");

const router = express.Router();

router.post('/', addPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.get("/",getAllPosts);
router.put("/like/:id",likePost);
router.put("/comment/:id",commentPost);

module.exports = router;
