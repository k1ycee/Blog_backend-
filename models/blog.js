const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = new Schema({
    id:{
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
        
    },
    img:{
        type: String,
    }
}, { timestamps: true });


const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;