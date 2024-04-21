const attendance = require("../model/attendance");

const Students = require("../model/student");

const staff = require("../model/Staff");
const student = require("../model/student");

const mail = require("./nodemailer");
const {ObjectId} = require('mongodb')
// exports.markattendace = async(req,res)=>{

// const {date,presentStatus,absentStatus,holidayStatus,studentId} = req.body

//    attendance.exists({Date:date}).then((datas)=>{

//     if(datas){
//         return res.send("attendace already marked")
//             }
//     else{
//         const data = new attendance({
//             Date:date,
//             presentStatus:presentStatus,
//             absentStatus:absentStatus,
//             holidayStatus:holidayStatus,
//             student_id:studentId
//         })

//            data.save().then((result)=>{

//             res.status(201).json("attendance marked")
//          }).catch((err)=>{
//             res.status(500).json(err.message)
//          })
//     }
// })

// }

exports.updateAttendance = async(req,res)=>{
  console.log("entererer")

    const {status,_id} = req.body
    console.log(typeof(_id))

    let staffData;
    let studentData;

    try{
         
         staffData = await staff.findById(req.userData.userId)
         console.log(staffData)
         const att = await attendance.findById(new ObjectId(_id))
         console.log("att",att)
         studentData = await student.findById({_id:att.student_id})
         console.log(studentData)

    }
    catch(err){
        return res.status(500).json(err.message)
    }
    let action = status.present ? "present" :"absent"

    attendance.findByIdAndUpdate(_id,{
        $set:{
            present:status.present,
            Absent:status.Absent,
            status:action
        }
    },{new:true}).then(async(result)=>{

        const totalPresnt = await attendance.find({student_id:studentData._id,
            holiday:false
        })
        const totalabsent = await attendance .find({student_id:studentData._id,Absent:true})
     
        const totalWorkingDays  = totalPresnt.length
        const totalabsentDays = totalabsent.length
        console.log(totalabsentDays)

        let percentage ;

        if(totalabsentDays == 0)
        percentage = 100
        else{
            percentage = Math.ceil(100-((totalabsentDays/totalWorkingDays)*100))
        }
        console.log("percentage",percentage)

       const studentupdate = await student.findByIdAndUpdate(studentData._id,{
        $set: {
            attendance:percentage
          }
    },{new:true})

    console.log(studentupdate)

       
        if(result.Absent == true ){
            const emailOptions = {
                from   :staffData.name,
                to     : studentData.email,
                subject: "leave Request",
                text    : `Dear parent
  
  
                           your son/daughter is Absent for the class today Kindly contact HOD 
                           
                          `
              };
              try {
                const sendmails = await mail.sendmails(emailOptions);
                res.status(200).json("success");
              } catch (error) {
                console.error("Error sending email:", error);
              }
        }
        
    }).catch((err)=>{
        res.status(500).json(err.message)
    })

}
exports.getAttendance = async (req, res) => {
  try {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0); 
      const endOfToday = new Date();
      endOfToday.setUTCHours(23, 59, 59, 999);

      const staffs = await staff.findById(req.userData.userId);
      const studentData = await student.find({
          Department: staffs.Department,
          section: staffs.assignedClass,
      });
      console.log(studentData)

      // let flatArray =[]
    
      
      
      const attendanceFieldData = [].concat.apply([], await Promise.all(
          studentData.map(async (item) => {
              const todayAttendance = await attendance.find({
                  student_id: item._id,
                  Date: {
                      $gte: today, 

                      $lt: endOfToday,
                  },
              }).populate("student_id");
              return todayAttendance;
          })
      ));
      console.log(attendanceFieldData)
      const sttData = studentData.map((std) => {
        const studentsNotInAttendance = attendanceFieldData.filter((att) => !att.student_id._id == std._id);
        return studentsNotInAttendance;            
                  
      });
      
      const flatArray = sttData.flat(); 
      console.log("array", flatArray.length);

      
     if(flatArray.length === studentData.length || (flatArray.length === 0 && studentData.length >=1)  ){
      console.log("entered")
        const newDatas = await Promise.all(
          studentData.map(async (item) => {
              const newAttendance = new attendance({
                  student_id: item._id,
                  Date: today,
              });
              await newAttendance.save();
              const populatedAttendance = await attendance
              .findById(newAttendance._id)
              .populate('student_id')
              .exec();
                return populatedAttendance;
            }))
            res.status(200).json(newDatas);
            console.log(newDatas)     
      }
     else if (flatArray.length === 0 ) {
        console.log('executing');
        res.status(200).json(attendanceFieldData);    
        }
      else {
          try {
              console.log('lllllll');
              const newData = await Promise.all(
                  flatArray.map(async (item) => {
                      const newAttendance = new attendance({
                          student_id: item._id,
                          Date: today,
                      });
                     await newAttendance.save();
                      const populatedAttendance = await attendance
                      .findById(newAttendance._id)
                      .populate('student_id')
                      .exec();
                        return populatedAttendance;
                  })
              );
              res.status(200).json(newData);
          } catch (err) {
              res.status(500).json(err.message);
          }
          
      }
  } catch (err) {

      res.status(500).json(err.message);
  }
};

exports.markHoliday = async (req, res) => {
  const { holiday, remarks, Date } = req.body;

  try {
    const attendanceData = await attendance.find({ Date: Date });

    console.log("attendanceData", attendanceData);

    if (attendanceData.length > 0) {
      return res.status(400).json("Attendance already marked");
    }

    const staffs = await staff.findById(req.userData.userId);
    console.log("staffs", staffs);

    if (staffs) {
      const students = await Students.find({
        Department: staffs.Department,
        section: staffs.assignedClass,
      });

      console.log("students", students);

      if (students.length > 0) {
        const data = await Promise.all(
          students.map(async (item) => {
            const markAttendance = new attendance({
              Date: Date,
              remarks: remarks,
              status: "holiday",
              student_id: item._id,
              holiday: holiday,
            });
            return await markAttendance.save();
          })
        );
        console.log(data);
        if (data) {
          res.status(200).json("Attendance marked");
        }
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
