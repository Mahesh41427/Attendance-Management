const mongoose = require('mongoose')



const connectDb = ()=>{
    mongoose.connect('mongodb+srv://Mahesh:cmahesh6038@cluster0.mxux2fm.mongodb.net/').then((data)=>{

    console.log('db connected')
    }).catch((err)=>console.log(err.message))  
}


module.exports = connectDb
