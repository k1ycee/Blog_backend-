require('dotenv').config();

const config = {
    databaseUrl:{
        prod: process.env.MONGO_URI,
        dev: process.env.MONGO_URI
    },
    cloudinary:{
        cloudname: process.env.CLOUD_NAME,
        apikey: process.env.API_KEY,
        apisecret: process.env.API_SECRET
    }
}
module.exports = config;


