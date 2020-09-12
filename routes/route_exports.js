const express = require('express');
const router = express.Router();
const blogRoute = require('../routes/blog_routes')

router.use(blogRoute)

module.exports = router