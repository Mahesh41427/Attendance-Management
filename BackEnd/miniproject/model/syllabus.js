const mongoose = require('mongoose')

const syllabusSchema = mongoose.Schema({

subjectId:{
    type:mongoose.Types.ObjectId,
    ref:'subject'
},
startDate:{
   type:Date
},
endDate:{
    type:Date
},
unit:{
    type:String
},

},{timestamps:true})

module.exports = mongoose.model('syllabus',syllabusSchema)