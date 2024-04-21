const staff = require('../model/Staff')
const student = require('../model/student')
const bcryptjs = require('bcryptjs')
const LoginSchema = require('../model/staffLoginSchema')
const settings = require('../model/settings')
const jwt           = require('jsonwebtoken')
const mail = require('./nodemailer')

require('dotenv').config();



exports.signup = async (req, res) => {
  const { name, Department, email, password, assignedClass, yearsOfExperience ,tutor } = req.body;

  try {
    const hashedPassword = await encrypt(password);

    const data = new staff({
      name: name,
      Department: Department,
      email: email,
      password: hashedPassword,
      assignedClass: assignedClass,
      yearsOfExperience: yearsOfExperience,
      classTutor:tutor
    });

    const result = await data.save();

    if (result) {
      res.status(200).json("staff added");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

async function encrypt(password) {
  return bcryptjs.hash(password, 10);
}

exports.staffSignin = async (req, res) => {
    const {device,location,ipAddress}=req.body
     if (!req.body.email || !req.body.password) {
          res
         .status(500)
         .send({ message: "Fill email and password field", type: "error" });
     }
     const user = await staff.findOne({
       email: req.body.email,
     });
     console.log(user)
     if (user) {
       const validPassword = await bcryptjs.compare(
         req.body.password,
         user.password
       );
       if (validPassword) {
     console.log("entered",validPassword)
         const jwtToken = jwt.sign(
           {
             userId        : user._id,
             role          : "staff",
           },
           process.env.JWT_KEY,
           {
             expiresIn: "3d",
           }
         );
         console.log(jwtToken)
         const loginData = new LoginSchema({
           user_id : user._id,
           jwtToken: jwtToken,
           role    : "staff",
           login   : true,
           device  :device, 
           location:location,
           ipAddress:ipAddress
         })
         loginData.save().then((result) => {
           if (result) {
             res.status(200).json({
               message: "Signin successfully",
               type   : "success",
               data   : {
                 user_id       :user._id,
                 jwtToken      :jwtToken,
                 fullName      :user.name,
                 role          :"staff",
                 email         :user.email
               },
             });
           }
         });
       } else {
         res.status(400).json({ error: "Invalid Password" });
       }
     } else {
       res.status(401).json({ error: "User does not exist" });
     }
   }


   exports.updateStaff = async (req, res) => {
    const _id = req.params.id;
    const { email, phone_number} = req.body;
  
    if (email || phone_number) {
      const data = await staff.findOne({
        $or: [
          {
            email: email,
          },
          {
            phone_number: phone_number,
          },
        ],
      })
      
      if (data) {
        return res.status(409).json({ message: "Cannot update, email or phoneNumber already exists" });
      }
    }
  
    client
      .findByIdAndUpdate(_id, req.body)
      .then((uClient) => {
        res.status(200).json({ message: "Client updated successfully", uClient });
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  };
  

  exports.studentsignup  = async(req,res)=>{

    const {name,Department,email,section,contactEmail} = req.body


    try{
      const staffData = await staff.findById(req.userData.userId)
      let password = `${name}${Department}`
         const data = new student ({
             name:name,
             Department:Department,
             email:email,
             password: await encrypt(password),
             classTutor:req.userData.userId,
             section:section,
             contactEmail:contactEmail
        })
        console.log(data)
        const result = await data.save()
 
        if(result){
          const emailOptions = {
            from   :staffData.name,
            to     : email,
            subject: "signup",
            text    : `you are successfully added as a student in ${Department}-${section} section 
                       
            
                      please find the login details to login
                      
                      email: ${email}
                      password:${password}
                      `
          };
          try {
            const sendmails = await mail.sendmails(emailOptions);
            res.status(200).json("student added");
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
    }
    catch(err){
       res.status(500).json(err.message)
    }
 }



 
 async function encrypt(password){
 
 return  bcryptjs.hash(password, 10);
 
 }