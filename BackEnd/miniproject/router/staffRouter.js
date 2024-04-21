const router = require('express').Router()


const staffController = require('../controller/staffController')

const subjectController = require('../controller/subjectcontroller')

const syllabusController = require('../controller/syllabusController')

const attendanceController = require('../controller/attendanceController')

const studentController = require('../controller/studentController')

const leaveController = require('../controller/leaveController') 

const settingsController = require('../controller/settingsController')

const dashBoardController = require('../controller/dashboard')



const authcheck = require('../middleware/authCheck')

router.post('/signup',staffController.signup)

router.post('/signin',staffController.staffSignin)

router.post('/addstudent',authcheck.staffAuthCheck,staffController.studentsignup)

router.post('/subject',authcheck.staffAuthCheck,subjectController.addsubject)

router.delete('/subject/:id',authcheck.staffAuthCheck,subjectController.deleteSubject)

router.put('/subject/:id',authcheck.staffAuthCheck,subjectController.updateSubject)

router.get('/subject',authcheck.staffAuthCheck,subjectController.getAllSubject)

router.post('/syllabus',authcheck.staffAuthCheck,syllabusController.addSyllabus)

router.put('/syllabus/:id',authcheck.staffAuthCheck,syllabusController.updateSyllabus)

router.get('/syllabus/:id',authcheck.staffAuthCheck,syllabusController.getSyllabusBySubject)

router.get('/syllabus/view/:id',authcheck.staffAuthCheck,syllabusController.getSyllabusById)

router.get('/attendance',authcheck.staffAuthCheck,attendanceController.getAttendance)

// router.post('/attendance',authcheck.staffAuthCheck,attendanceController.markattendace)

router.put('/attendance',authcheck.staffAuthCheck,attendanceController.updateAttendance) 


router.post('/holiday',authcheck.staffAuthCheck,attendanceController.markHoliday)



//settings 

router.get('/settings',authcheck.staffAuthCheck,settingsController.getAllSettings)

router.post('/settings',authcheck.staffAuthCheck,settingsController.createSettings)


router.put('/settings/:id',authcheck.staffAuthCheck,settingsController.updateSettings)




//student
router.get('/student',authcheck.staffAuthCheck,studentController.getallStudents) 
router.put('/student/:studentId',authcheck.staffAuthCheck,studentController.updateStudent)
router.get('/studentbyid/:id',authcheck.staffAuthCheck,studentController.getStudentById)


//leave

router.get('/leave',authcheck.staffAuthCheck,leaveController.getallLeaveDetailsBystaff)
router.post('/action/:id',authcheck.staffAuthCheck,leaveController.approveOrRejectleave)


//holiday //attendance

router.post('/holiday',authcheck.staffAuthCheck,attendanceController.markHoliday)
router.get('/attendance',authcheck.staffAuthCheck,attendanceController.getAttendance)


//dashBoard

router.get('/presentcount',authcheck.staffAuthCheck,dashBoardController.getPresentDetails)
router.get('/absentcount',authcheck.staffAuthCheck,dashBoardController.getabsentDetails)
router.get('/studentscount',authcheck.staffAuthCheck,dashBoardController.gettotaltudentsDetails)








 





module.exports = router;
