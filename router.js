const express = require("express");
const router =express.Router();
const { createPost, deletePost, editPostPage, savePost, viewPost,
     newPostPage, showPostPage} = require('./controllers/postController');
const multer=require('multer');
const {storage}=require('./upload.js');
const { register, login, getUser} = require("./controllers/userControllers");
const { verifyUser } =require("./middleware/authMiddleware.js");

// const upload =multer({dest:'assets/postImages'})
const upload =multer({storage})

router.get('/new-post',newPostPage);
router.post('/new-post', upload.single('picture'),createPost);
router.post("/delete/:_id", deletePost);
router.post("/viewmore/:_id",viewPost);
router.get('/editmore/:_id',editPostPage);
router.get("/show",showPostPage);
router.post('/savepost/:_id',savePost);


router.post("/register",register);
router.post("/login",login);
router.get('/showing', verifyUser, getUser)

module.exports={router}