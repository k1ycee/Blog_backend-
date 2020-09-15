const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const cors = require('cors')
const router = require('./routes/route_exports')
const app = express();
const cloudinary = require('cloudinary')
const port = process.env.PORT || 3030;

dotenv.config();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(router);
app.get('/', (req, res) => {
    res.redirect('/blogs')
})
cloudinary.config({
    cloud_name: "dchsw3ztg",
    api_key: "233568856113656",
    api_secret: "Uh3sZPzhyFFTieVzZPly3co3q3s"
});

// console.log(process.env.API_KEY);

mongoose.connect("mongodb+srv://Denzel:mechaD00dle@blog.zcoup.mongodb.net/blog?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })).catch((err) => console.log(err))




