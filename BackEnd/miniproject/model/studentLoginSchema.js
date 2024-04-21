const mongoose = require('mongoose');

const loginData_schema = mongoose.Schema({

    user_id:{
        type:String
    },
    token:{
        type:String
    },
    jwtToken:{
        type:String
    },
	role:{
        type:String
    },
    device:{
        type:String
    },
    location:{
        type:String
    },
    login:{
        type:Boolean
    },
    ipAddress:{
        type:String
    }

},{timestamps:true})

module.exports = mongoose.model('studentloginData',loginData_schema);