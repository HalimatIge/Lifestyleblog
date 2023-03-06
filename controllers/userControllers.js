const { compare } = require("bcrypt");
const User = require("../models/userModel");
const jwt =require('jsonwebtoken');
const dotenv=require('dotenv');
const { sendMail } = require("../mail");
dotenv.config();

const register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  User.create({ firstname, lastname, email, password }, async (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "An error",
       
      });
      console.log(err);
    } else {
    try{
      await sendMail({
        to:email,
        subject:"Registration successful",
        html:`
        <div>
        <h3 style="font-size:20px">Welcome</h3>
        <p style=""> ${firstname} welcome to lifestyleblog</p>

        </div>
        `
      });
    }catch(err){
      console.log("an error has occurred when trying to send email");
    }
      res.json({
        success: true,
        message: "User registration sucessful",
        data
      });
    }
  });
};


const login=(req,res)=>{
    const{email,password}=req.body;
    User.findOne({email}).select('+password').exec(async (err, data) => {
        if (err) {
          res.status(500).json({
            success: false,
            message: "An error",
          });
        } else {
          if(data){
        const validPassword= await compare(password,data.password);
        if(validPassword){
          const token=jwt.sign(
            {email:data.email,_id:data._id},
            process.env.JWT_SECRET,
            {expiresIn:'335'}
          )
          data.password='';
          res.json({
            token,
            success:true,
            message:'login sucessful',
            data
          })
        }
        }
      else{
        res.status(400).json({
          success: false,
          message: "Email does not match any details",
        });
      }
    }
      });
}


const getUser=(req,res)=>{
  res.send('profile is here')
    User.findOne(req.user._id,(error,data)=>{
        if (error) {
           res.status(500).json({
            success:false,
            message:"an error occured when fetching "
           }) 
           console.log('showing error');
        }else{
          res.json({
            success:true,
            message:'login sucessful',
            data
          })
        }
    })
}
module.exports = { register,login,getUser };
