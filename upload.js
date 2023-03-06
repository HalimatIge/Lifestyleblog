const {CloudinaryStorage}=require('multer-storage-cloudinary');

const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();
cloudinary.config({
  api_key: process.env.C_API_KEY,
  cloud_name: process.env.C_CLOUD_NAME,
  api_secret: process.env.C_API_SECRET,
});

const storage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'lifestyleblog',
        allowedFormat:["png","jpeg","svg","gif"]
    }
})
module.exports = {storage,cloudinary}