const Blog = require('../models/blog')
const cloudinary = require('cloudinary').v2;


exports.getAllBlogs = async (req, res, next) => {
    try{
        const blog = await Blog.find({});
        return res.status(200).json(blog);
    }catch(e){
        next(e);
    }
}

exports.getSingleBlog = async  (req, res, next) => {
    try{
        const id = req.params.id;
        const result = await Blog.findById(id)
        return res.status(200).json(result);
    }catch(e){
        next(e)
    }
}

exports.createNewblog = async (req, res, next) => {
    const image = req.file.path;
    // console.log(image);
    const result = await cloudinary.uploader.upload(image)
    try{
        const body = req.body;
        const blog = new Blog({
            title: body.title,
            snippet: body.snippet,
            body: body.body,
            img: result.url
        });
        await blog.save();
        return res.status(201).json({
            message: "Blog created Created Successfully",
            blog
        });
    }catch(e){
        next(e)
    }
}

exports.deleteSingleBlog = async (req, res, next) => {
    try{
        const id = req.params.id;
        await Blog.findByIdAndDelete(id)
        return res.status(204).json({
            success: true,
            message: "Successfully Deleted Blog"
        })
    }catch(e){
        next(e)
    }
}

exports.editBlog =  async (req, res, next) => {
    try{
        const id = req.params.id;
        Blog.findById({ _id: id }, async (err, data) => {
            if (err) {
                res.send(err);
            }
            data.title = req.body.title,
                data.snippet = req.body.snippet,
                data.body = req.body.body
            await data.save()
            return res.status(201).json({
                success: true,
                message: "Blog Successfully updated",
                data
            })
        })
    }catch(e){
        next(e);
    }
}
// exports.uploadImage = async (req, res, next) => {
//     const image = req.file;
//     // const result = await cloudinary.uploader.upload(image)
//     // return res.status(200).json({
//     //     message: "Image Successfully Uploaded",
//     //     result
//     // })
//     console.log(image)
// }