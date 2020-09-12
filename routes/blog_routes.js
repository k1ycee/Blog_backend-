const express = require('express');
const router = express.Router();
const {getAllBlogs, getSingleBlog, createNewblog, deleteSingleBlog, editBlog, uploadImage} = require('../controller/blog_controller');
const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb){
//         cb(null, "IMG" + new Date.now() + file.originalname);
//     }
// })
// const parser = multer({ storage, limits: {
//     fileSize: 1024 * 1024 * 5,

// }});
const parser = multer({ dest: 'uploads/'})

router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getSingleBlog);
router.post('/blogs', parser.single('blogImages') ,createNewblog);
router.delete('/blogs/:id', deleteSingleBlog);
router.put('/blogs/:id', editBlog);
// router.post('/uploadimage',,uploadImage);

module.exports = router;