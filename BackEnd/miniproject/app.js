const express = require('express')
const morgan = require('morgan')

const app = express(function(req,res){
    res.setHeader('Content-Type', 'application/json');
  });

  const cors = require('cors');

  app.use(cors({
    origin: '*'
  }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  const student = require('./router/studentRouter')
  const staff = require('./router/staffRouter');
  app.use(morgan("dev"))

  app.use('/student',student)
  app.use('/staff',staff)



app.use("*", (req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use("*", (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });

  module.exports = app;