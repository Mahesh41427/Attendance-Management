const student = require('../model/student')
const bcryptjs = require('bcryptjs')
const LoginSchema = require('../model/studentLoginSchema')
const attendance = require('../model/attendance')

const staff = require('../model/Staff')
const jwt           = require('jsonwebtoken')
const {ObjectId} = require('mongodb')


exports.studentSignin = async (req, res) => {
   const {device,location,ipAddress}=req.body
    if (!req.body.email || !req.body.password) {
         res
        .status(500)
        .send({ message: "Fill email and password field", type: "error" });
    }
    const user = await student.findOne({
      email: req.body.email,
    });
    if (user) {
       
      const validPassword = await bcryptjs.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        const jwtToken = jwt.sign(
          {
            userId        : user._id,
            role          : "student",
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1d",
          }
        );
        const loginData = new LoginSchema({
          user_id : user._id,
          jwtToken: jwtToken,
          role    : "student",
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
                email         :user.email,
                role:    result.role   
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


  exports.updateStudent = async(req,res)=>{

    const {studentId}=req.params
    
    student.findByIdAndUpdate(studentId,{
     $set:{
          name:req.body.name,
          section:req.body.section,
          Department:req.body.Department,
          email:req.body.email,
          classTutor:req.body.classTutor,
          contactEmail:req.body.contactEmail
    }
    },{new:true}).then((data)=>{
         res.status(200).json("updated")
    }).catch((err)=>{
   res.status(500).json(err.message)

    })
  }

exports.getallStudents = async(req,res)=>{

try{
  const students  = await student.find({classTutor:req.userData.userId})

  if(students.length <=0){
    res.status(200).json([])
  }
  else{
    res.status(200).json(students)
  }
}
catch{
  res.status(500).json(err.message)
}
}

exports.getStudentById = async(req,res)=>{
  console.log('gets inside')
  const id = req.params.id
  console.log(typeof(id))

 try{

const studentData = await student.findById(id)
if(!studentData){
 return res.status(404).json({message:"student not found"})
}
const attendanceData = await attendance.find({student_id:id,holiday:false})

const totalWorkingDays = attendanceData.length

const presentData = await attendance.find({student_id:id,present:true})

const totalPresentDays = presentData.length

const absentData = await attendance.find({student_id:id,Absent:true})

const totalAbsentDays = absentData.length


console.log(totalWorkingDays)
console.log(totalPresentDays)
console.log(totalAbsentDays)



res.status(200).json({
  studentData: studentData,
  totalWorkingDays: totalWorkingDays,
  totalPresentDays: totalPresentDays,
  totalAbsentDays: totalAbsentDays
});


 }
 catch(err){
  res.status(500).json(err.message);
 }

}






