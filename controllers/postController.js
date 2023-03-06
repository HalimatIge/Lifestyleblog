const Post=require('../models/postModel')
let posts=[];
const createPost= (req,res)=>{
    const {title,more}=req.body;
    
    const {filename, path}=req.file;

    // let filename=""
    // if(req.file){
    //     filename =req.file.filename; 
    // }
    posts.push({title,more,imagePath:filename, imageLink:path})
    Post.create({title, more, imagePath:filename, imageLink:path}, (err, message)=>{
        if(err){
            res.status(500).json({
                success:false, 
                message:"An error occured"
            })
        } else {
            res.json({
                success:true,
                data:message,
                message:"New Post added successfully"
            })
        }
    })

    // posts.unshift({title,more});
    // try {
    //     const post = await  Post.create({title,more}  )
    //     if (post) {
    //         console.log("error ti wa"+ error);
    //         res.redirect("/show");
    //     }
    // } catch (error) {
    //     console.log(error);
    // }
    // console.log(req.body);
}
const deletePost=(req,res)=>{
    const {_id}=req.params;
    // console.log(_id);
    Post.findByIdAndDelete(_id,(error,message)=>{
        if(error){
            console.log(error);
            res.send('an error occured')
        }
        else{
            res.redirect("/show")
        }
    })
    
   
}
const editPostPage=(req,res)=>{
    const {_id}= req.params
    Post.findById(_id, (err, message)=>{
        if(err){
            console.log(err);
            res.send("There's an error");
        } else if(message) {
            res.render("edit", {post:message})
        } else {
            res.redirect("/show")
        }
    })
    // let post =posts.find((item ,ind)=> ind == index);
    // if (post) {
    //     res.render("edit",{index,post})  
    // }else{
    // }


}
const savePost=(req,res)=>{
    const {_id} = req.params;
    const {title, more}=req.body;
    Post.findByIdAndUpdate(_id, {title, more}, (err, message)=>{
        if(err){
            console.log(err);
            res.send("There's an error")
        } else {
            res.redirect('/show')
        }
    })
    // posts[index]={title, more};
}
const viewPost=(req,res)=>{
    const {_id}= req.params
//    let post =posts.find((item ,ind)=> ind == index);
   Post.findById(_id,(err,message)=>{
    if(err){
        console.log(err);
        res.send("There's an error");
    } else if(message) {
        res.render('viewmore', {post:message, _id})
     } 
    //  else {
    //     res.redirect("/")
    // }
})
   
}
const newPostPage=(req,res)=>{
    res.render('newpost',{posts})
}
const showPostPage=(req,res)=>{
    let date =new Date().toLocaleTimeString('en')
    
    Post.find((error,data)=>{
        if (error) {
           res.status(500).send(error) 
        }else{
            res.status(200).send(data)
        }
    })
      
    }
module.exports={createPost,deletePost,editPostPage,savePost,viewPost,newPostPage,showPostPage};
