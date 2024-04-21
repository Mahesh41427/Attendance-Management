const jwt = require("jsonwebtoken");


exports.studentAuthCheck = (req, res, next) => {
    console.log("hi all Admin check auth running");
    console.log("request", req.headers.authorization);
    console.log("role", req.headers.role);
    try {
      const token = req.headers.authorization.split(" ")[1];
       const role = req.headers.role;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("decoded", decoded);
      if (token ) {
        if (role === "student") {
          try {
            req.userData = decoded;
            req.userData.role = role
            login = true;
            next();
          } catch (err) {
            console.log(err);
            return res.status(401).json({
              code: 401,
              status: "error",
              message: "Token expired",
            });
          }
        } else {
          res.status(400).json({
            code: 400,
            message: "Invalid role provided",
          });
        }
      } else {
        res.status(400).json({
          code: 400,
          message: "Please enter role & JWT token details",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal server error",
        data: error,
      });
    }
  };
  


  exports.staffAuthCheck = (req, res, next) => {
    console.log("hi all Admin check auth running");
    console.log("request", req.headers.authorization);
    console.log("role", req.headers.role);
    try {
      const token = req.headers.authorization.split(" ")[1];
       const role = req.headers.role;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      console.log("decoded", decoded);
      if (token ) {
        if (role === "staff") {
          try {
            req.userData = decoded;
            req.userData.role = role
            login = true;
            next();
          } catch (err) {
            console.log(err);
            return res.status(401).json({
              code: 401,
              status: "error",
              message: "Token expired",
            });
          }
        } else {
          res.status(400).json({
            code: 400,
            message: "Invalid role provided",
          });
        }
      } else {
        res.status(400).json({
          code: 400,
          message: "Please enter role & JWT token details",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        status: "error",
        message: "Internal server error",
        data: error,
      });
    }
  };
  