const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const Blog = require('./models/blog')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// var parse = bodyParser.urlencoded({ extended: true });

mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true })
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
