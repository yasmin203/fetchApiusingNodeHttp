const nodemailer = require("nodemailer")

const smtpConfig={
    service:"gmail",
    auth:{
        user:"anayasoo2031995@gmail.com",
        pass:"keep.safe"
    }
}

const sendEmailCustom = (reciver, emailTxt, subject)=>{
try{
const emailOptions ={
    from:"RealState Application ",
    to:reciver,
    subject:subject,
    html:emailTxt
}
transporter.sendEmail(emailOptions)

}catch(e){
 console.log(e)
}

}
module.exports= sendEmailCustom