const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({

name:{
    type:String
},
section:{
    type:String
},
Department:{
    type:String
},
email:{
    type:String
},
password:{
    type:String
},
classTutor:{
    type:mongoose.Types.ObjectId,
    ref:'staff'
},
contactEmail:{
    type:String
},
attendance:{
    type:Number,
    default:100
}

},{timestamps:true})

module.exports = mongoose.model('student',studentSchema)