const express = require('express');
const router = express.Router();
const {getAllBlogs, getSingleBlog, createNewblog, deleteSingleBlog, editBlog, uploadImage} = require('../controller/blog_controller');
const multer = require('multer');
const parser = multer({ dest: 'uploads/'})

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getSingleBlog);
router.post('/blogs', parser.single('blogImages') ,createNewblog);
router.delete('/blogs/:id', deleteSingleBlog);
router.put('/blogs/:id', editBlog);
// router.post('/uploadimage',,uploadImage);

module.exports = router;