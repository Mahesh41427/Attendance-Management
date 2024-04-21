const student = require('../model/student')

const staff = require('../model/Staff')

const leave = require('../model/leaveRequest')

const mail = require('./nodemailer')



exports.applyLeave = async(req,res)=>{

    const {staffId,appliedReason} = req.body


    try{

        const existingLeave = await leave.findOne({
            studentId: req.userData.userId, 
            appliedOn: {
                $gte: new Date().setHours(0, 0, 0, 0), 
               $lt: new Date().setHours(24, 0, 0, 0),
            },
          })
          console.log(existingLeave)

          if(existingLeave){
           return res.status(400).json('leave already applied')
          }
          

    const data = new leave({
    studentId:req.userData.userId,
    appliedOn:new Date(),
    appliedReason:appliedReason,
    appliedTo:staffId
})

const result = await data.save()
if(result){
    res.status(201).json("leave submitted")
}

    }
    catch(err){
        res.status(500).json(err.message)

    }
}



exports.viewStatus = async(req,res)=>{
try{

    const date = new Date();

    date.setHours(23, 59, 59, 999);
    const leaveDetails = await leave.find({studentId:req.userData.userId, appliedOn: {
               $gte: new Date().setHours(0, 0, 0, 0), 
               $lt: new Date().setHours(48, 0, 0, 0),
      },}).populate("approvedBy")

     console.log(leaveDetails)
    if(leaveDetails){
        res.status(200).json(leaveDetails)
    }
}
    catch(err){
        res.status(500).json(err.message)


    }

}


exports.getallLeaveDetailsBystaff = async(req,res)=>{

    try{
    const leaveDetails = await leave.find({appliedTo:req.userData.userId,status:"pending"}).populate("studentId")
    if(leaveDetails.length <= 0){

        return res.status(200).json([])
    }
      res.status(200).json(leaveDetails)
    }

    catch(err){
        res.status(500).json(err.messgae)
    }
}


exports.approveOrRejectleave = async(req,res)=>{
    console.log("entered")

    const id = req.params.id
    const {status,staffReason} = req.body

    try{
        const leaveData = await leave.findById(id)
        console.log("leaveData",leaveData)
        const studentData = await student.findById(leaveData.studentId)
        console.log("studentData",studentData)

        const staffData = await staff.findById(req.userData.userId)
        console.log("staffData",staffData)

        const data = await leave.findByIdAndUpdate(id,{

            $set:{
                approvedBy:req.userData.userId,
                acceptedOrRejectDate:new Date (),
                status:status,
                staffReason:staffReason
            }
        })

        if(data){
            const emailOptions = {
              from   :staffData.name,
              to     : studentData.email,
              subject: "leave Request",
              text    : `Dear ${studentData.name}


                         your leave request for the day ${leaveData.appliedOn.toDateString()} is ${status} by ${staffData.name}
                         
                        `
            };
            try {
              const sendmails = await mail.sendmails(emailOptions);
              res.status(200).json("success");
            } catch (error) {
              console.error("Error sending email:", error);
            }
          }

    }
    catch(err){
        res.status(500).json(err.messgae)
    }
}


exports. deleteRequest = async(req,res)=>{

try{
    const {id} = req.params

    const deleted = await leave.findByIdAndDelete(id)

    if(deleted){
        res.status(200).json("deleted")
    }
}
catch(err){
    res.status(500).json(err.messgae)
}
}

exports.staffByDepartment = async(req,res)=>{
    try{
        const studentData = await student.findById(req.userData.userId)
        console.log(studentData)
        if(studentData){
           const staffs = await staff.find({Department:studentData.Department})

           if(staffs.length < 1){

            return res.status(200).json([])
           }
           res.status(200).json(staffs)

        }
    }
   
    catch(err){

        res.status(500).json(err.messgae)

    }
}





         



        








