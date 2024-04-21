const attendance = require('../model/attendance')
const student = require('../model/student')


exports.getPresentDetails = async (req, res) => {
    try {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      const endOfToday = new Date();
        endOfToday.setUTCHours(23, 59, 59, 999);
  
      const pipeline = [
        {
          $match: {
            Date: {
              $gte: date,
              $lt: endOfToday,
            },
            present: true,
          },
        },
        {
          $project: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ];
  
      const result = await attendance.aggregate(pipeline);
       
      res.status(200).json(result.length > 0 ? result.length:0);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  exports.getabsentDetails = async (req, res) => {
    try {
      const date = new Date();
      date.setUTCHours(0, 0, 0, 0);
      const endOfToday = new Date();
      endOfToday.setUTCHours(23, 59, 59, 999);
  
      const pipeline = [
        {
          $match: {
            Date: {
              $gte: date,
              $lt: endOfToday,
            },
            Absent: true,
          },
        },
        {
          $project: {
            _id: null,
            count: { $sum: 1 },
          },
        },
      ];
  
      const result = await attendance.aggregate(pipeline);
      console.log(result)
       
      res.status(200).json(result.length > 0 ? result.length:0);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.gettotaltudentsDetails = async (req, res) => {
    try {
      const result = await student.find({classTutor:req.userData.userId})
      res.status(200).json(result.length > 0 ? result.length:0);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  