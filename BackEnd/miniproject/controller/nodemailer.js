const nodemailer = require('nodemailer')


exports.sendmails = async (emailOptions)=>{

return new Promise((resolve,reject)=>{

    const transporter = nodemailer.createTransport({
        service:"Gmail",
        auth   : {
          user: "maheshc41427@gmail.com",
          pass: "igyiojarsiyttoea"
        }
        ,debug: true
      });
  
        transporter.sendMail(emailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            reject(error);
          } else {
            console.log('Email sent:', info.response);
            resolve(info.response);
          }
        });
})




}