const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const multer = require('multer');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3030;
const Blog = require('./models/blog')




// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', 'http://localhost:4200');
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     res.append('Access-Control-Allow-Credentials', true);
//     next();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// // app.use(bodyParser.raw({ extended: true }));
// // app.use(cors({
// //     origin: '*'
// // }));


// var parse = bodyParser.urlencoded({ extended: true });

mongoose.connect("mongodb+srv://Denzel:mechaD00dle@blog.zcoup.mongodb.net/blog?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })).catch((err) => console.log(err))



app.get('/', (req, res) => {
    res.redirect('/blogs')
});
app.get('/blogs', (req, res) => {
    const blog = Blog;
    blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => res.send(result))
        .catch((err) => console.error(err))
});

app.post('/blogs',(req, res) => {
    const body = req.body;
    console.log(req.file);
    const blog = new Blog({
        title : body.title,
        snippet: body.snippet,
        body: body.body
        // img: req.file.filename
    });
    // blog._id = 1;
    blog.save()
        .then(() => res.json({
            success: true,
            message: "Blog Successfully Uploaded"
        }))
        .catch((err) => {
            console.log(err);
            res.json({
                success: false,
                message: "Blog Upload Unsuccessful"
            })
        })
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => res.json({
            success: true,
            message: "Blog successfully Deleted"
        }))
        .catch(() => res.json({
            success: false,
            message: "Blog was not deleted"
        }))
});

app.put('/blogs/:id',(req, res) => {
    const id = req.params.id;
    Blog.findById({_id: id},(err, data) => {
        if(err){
            res.send(err);
        }
        data.title = req.body.title,
        data.snippet = req.body.snippet,
        data.body = req.body.body
        data.save()
            .then(() => res.json({
                success: true,
                message: "Blog Successfully updated"
            }))
            .catch(() => res.json({
                success: false,
                message: "Blog was updated"
            }))
    })
});
