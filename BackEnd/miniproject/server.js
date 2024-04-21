const app = require('./app')
const connectDb= require('./db')
const PORT =8090


connectDb()
const server=
app.listen(PORT, ()=>{
    console.log('server is runing at port' +PORT)
})

process.on('unhandledRejection',(err)=>{
    console.log(err.message)
    server.close(()=>process.exit(1))
})


