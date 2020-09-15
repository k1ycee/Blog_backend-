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

});

// console.log(process.env.API_KEY);

mongoose.connect(, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })).catch((err) => console.log(err))




