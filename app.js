const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Blog = require('./models/blog')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());





mongoose.connect("Go and Get yours", { useNewUrlParser: true, useUnifiedTopology: true })
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

app.post('/blogs', (req, res) => {
    const body = req.body;
    const blog = Blog(body);
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

app.put('/blogs/:id', (req, res) => {
    const id = req.params.id;
});
