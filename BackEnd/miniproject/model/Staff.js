const mongoose = require('mongoose')
   
const staffSchema = mongoose.Schema ({

    name:{
        type:String
    },
    email:{
      type:String
    },
    password:{
      type:String
    },
    assignedClass:{
      type:String
    },
    Department:{
      type:String 
    },
    yearsOfExperience:{
        type:Number
    },
    classTutor:{
      type:Boolean
    }

},{timestamps:true})

module.exports = mongoose.model('staff',staffSchema)