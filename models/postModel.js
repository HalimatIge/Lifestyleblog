const mongoose=require("mongoose");


const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    more:String,
    time:{
        type:Date,
        default:Date.now(),
    },
    imagePath:String, 
    imageLink : String
});

const Post=mongoose.model("Post",postSchema);

module.exports=Post;