const mongoose = require('mongoose')



const LeaveSchema = new mongoose.Schema({

approvedBy:{
    type:mongoose.Types.ObjectId,
    ref:"staff"
},
appliedTo:{
    type:mongoose.Types.ObjectId,
    ref:"staff"
},
studentId:{
    type:mongoose.Types.ObjectId,
    ref:"student"
},
appliedOn:{
    type:Date
},
acceptedOrRejectDate:{
    type:String
},

status:{
    type:String,
    enum:["accepted","rejected","pending"],
    default:'pending',
},
appliedReason:{
    type:String,
    default:""
},
staffReason:{
    type:String,
    default:""
}
})


module.exports = mongoose.model('leave',LeaveSchema)