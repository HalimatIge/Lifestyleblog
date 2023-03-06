const express = require ('express');
const cors = require("cors");
//inside express there is amethod static
//app is intialization of express
const dotenv=require("dotenv");
const mongoose=require("mongoose");
// const MongoClient=require('mongodb').MongoClient

const http=require("http");
const {Server}=require("socket.io");


dotenv.config();

const app= express();
const PORT=process.env.PORT || 5000;
app.use(cors());



const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

let users=[];
io.on('connection',(socket)=>{

//    socket.on('join-socket',(_id)=>{
//     const exist=users.find((each)=>each.id==_id);
//     if(exist){
//         users=users.map(each=>each.id==id?{socketId:socket.id,...each}:each);
//     }else{
//         users.push({_id,socketId:socket.id})
//     }
//   })

    console.log("user-connected"+socket.id);
    socket.on("user-active",(message)=>{
        console.log(message);
    });
    socket.on("send-message",(message)=>{
        socket.broadcast.emit("message-sent",message)
    });
    socket.on("join-group",(group)=>{
        socket.join(group);
    });
socket.on("send-msg-to-group",({group,chat})=>{
        socket.to(group).emit("msg-sent-to-group",chat);
    });
})



const path =require('path');
const bodyparser=require("body-parser");
// const Post = require('./models/postModel');
const { router } = require('./router');
app.use(bodyparser.urlencoded({extended:true}));

// app.use(
//     fileUpload({
//   limits:{
//     fileSize:10000000,
//   },
// abortOnLimit:true,
// })
// );
// app.use(express.static('photo'));
app.use(express.static('views'));
app.use(express.json());

app.get("/",(req,res)=>{

})

mongoose.set('strictQuery',true);
mongoose.connect(process.env.URI,(error)=>{
    if (error) {
     console.log('error ti wa o');   
     console.log(error);
    } else {
    console.log("sope gone");
    }
});

app.get('/data',(req,res)=>{
    
})


app.set('view engine','ejs');
app.get('/upload',(req,res)=>{
    res.render('photo')
});
app.post("/upload",(req,res)=>{
console.log(req.files);
const {image}=req.files;
if(!image) return res.sendStatus(666);
if(/^image/.test(image.mimetype)) return res.sendStatus(666);
image.mv(__dirname+'/contact'+image.name);
res.sendStatus(440);
});

// app.use( "/", (req,res,next)=>{})
//middlewear used for authentification
//it will affect all the whole router but you can spectify which route you want

app.use(express.static (path.join(__dirname + '/assets')));
//OR
// app.use(express.static (__dirname + '/assets'));
//to download images
app.get("/" ,(req,res)=>{
    // res.send('My name is Halima')
    // res.sendfile('index.html')
     res.sendFile(__dirname+'/index.html')
})
app.get("/profile/:username", (req,res)=>{
    const {username}= req.params;
    const {what,age} =req.query;
    console.log(username);
    // console.log(query);
    
res.send(`Here is the profile ${username},${what} ${age}` )
// res.send("Here is the profile "+ username )
});
app.get("/" , (req,res,next)=>{}, (req,res)=>{
      // res.sendFile(__dirname+'/index.html')
});

app.get("/home",(req,res)=>{
    const myName="Ige Halima";
    const user={
        name:"Halima",
        dept:"Software engineering",
        school:"SQI"
    }
    const numbers=[0,1,2,3,4,5,6,7,8,9];
    
    res.render("home",{name:myName,user,numbers})
});
app.get("/contact",(req,res)=>{

    res.render("contact")
});
app.get("/zendesk",(req,res)=>{

    res.render("zendesk" )
});








// app.post('/new-post',(req,res)=>{
//     const {title,more}=req.body;
//     posts.push({title,more});
//     Post.create({title,more},(error,message)=>{
// //the callback take 2 parameter error and response
// if (error) {
//     console.log("error ti wa"+ error);
// } else {
//     console.log("you added a new post");
// }
//     });

//     try {
        
//     } catch (error) {
        
//     }
// console.log(req.body);

// res.redirect("/show");
// });




// app.get("/show",(req,res)=>{
// let date =new Date().toLocaleTimeString('en')

// Post.find().then((posts)=>{
//     res.render("show",{date, posts})
// }).catch((error)=>{
//     console.log(error);
// })
  
// });


// app.post('/delete',(req,res)=>{
//        let del =req.body.value;
//    posts.splice(del,1)  
//        res.redirect("/show")  
//     });
//OR
// app.post('/delete/:index',(req,res)=>{
//    const {index}=req.params
//    posts.splice(index,1)
//    posts=posts.filter((item, index)=> index != del)
//OR
// let del =req.body.params;
// posts.splice(del,1)

//    res.redirect("/show")  
// });
//MIDDLEWEAR 
// app.use('/delete/:index', (req,res,next)=>{
//     const {index}=req.params;
//     if (index==0) {
//      res.redirect('/show')   
//     }
//     else{
//         next();
//     }
// }
// )

// (req,res,next)=>{
//     const {index}=req.params;
//     if (index==0) {
//      res.redirect('/show')   
//     }
//     else{
//         next();
//     }
// },


// app.post('/delete/:index',(req,res)=>{
//     const {index}=req.params
//     posts.splice(index,1)
//     res.redirect("/show")
// }
// );



// app.post("/editmore/:index", (req,res)=>{
//     const {index}= req.params
//    let post =posts.find((item ,ind)=> ind == index);
//     res.render('edit', {post, index})

// });

// app.post("/editpost/:index",(req,res)=>{
// const {index} = req.params;
// posts.splice(index, 1, req.body);

// res.redirect("/show");
// });

app.use("/", router);


server.listen(PORT,()=>{
    console.log('server is running');
    
});
