const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({

subjectName:{
    type:String
},
staffId:{
    type:mongoose.Types.ObjectId,
    ref:'staff'
}
},{timestamps:true})

module.exports = mongoose.model('subject',subjectSchema)