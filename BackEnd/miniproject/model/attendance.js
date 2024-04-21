const mongoose = require('mongoose')



const attendanceSchema = mongoose.Schema ({
Date:{
    type:Date,
    required:true
},
status: {
    type: String,
    enum: ['present', 'absent','holiday','unmarked'],
    required: true,
    default:'unmarked'
  },
  present:{
    type:Boolean,
    default:false
  },
  Absent:{
    type:Boolean,
    default:false
  },
  holiday:{
    type:Boolean,
    default:false
  },
remarks:{
    type:String,
    default:''
},
isalreadymarked:{
  type:Boolean
},
student_id:{
      type:mongoose.Types.ObjectId,
      ref:'student'
}

},{timestamps:true})

module.exports = mongoose.model('attendance',attendanceSchema)