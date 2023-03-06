const { createTransport } = require("nodemailer")

const sendMail=async({to,subject,text,HTML})=>{
    const transporter=createTransport({
        host:'smtp.gmail.com',
        secure:true,
        service:"gmail",
        port:587,
        auth:{
            user:process.env.APP_MAIL,
            pass:process.env>APP_PASSWORD

        }
        
    })
    const info = await transporter.sendMail({
        from:process.env.APP_MAIL,
        to,
        subject,
        text,
        html,
        // to:emails,
        // subject:"From LifestyleBlog",
        // text:"you are welcome to lifestyleblog"
    })
    console.log(info);
}
module.exports={sendMail}