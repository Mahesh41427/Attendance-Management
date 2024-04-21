const router = require('express').Router()

const authcheck = require('../middleware/authCheck')


const studentController = require('../controller/studentController')

const subjectController = require('../controller/subjectcontroller')

const syllabusController = require('../controller/syllabusController')

const attendanceController = require('../controller/attendanceController')

const leaveController = require('../controller/leaveController') 
 
router.post('/signin',studentController.studentSignin)

router.get('/subject',authcheck.studentAuthCheck,subjectController.getAllSubject)

router.get('/syllabus/:id',authcheck.studentAuthCheck,syllabusController.getSyllabusBySubject)


router.get('/attendance',authcheck.studentAuthCheck,attendanceController.getAttendance)

router.get('/studentbyid/:id',authcheck.studentAuthCheck,studentController.getStudentById)
//leave
router.post('/leave',authcheck.studentAuthCheck,leaveController.applyLeave)
router.get('/staffs',authcheck.studentAuthCheck,leaveController.staffByDepartment)
router.get('/status',authcheck.studentAuthCheck,leaveController.viewStatus)
router.delete('/cancelleave/:id',authcheck.studentAuthCheck,leaveController.deleteRequest)




module.exports = router;
