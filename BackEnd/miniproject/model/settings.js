const mongoose = require('mongoose')



const settingsSchema = new mongoose.Schema({

classTutor:{
    type:mongoose.Types.ObjectId,
    ref:"staff"
},
TotalWorkingDays:{
    type:Number
},
Department:{
    type:String,
    enum:["MCA","BCA"]
},
semesterStartDate:{
    type:Date
}

})

module.exports = mongoose.model('settings',settingsSchema)