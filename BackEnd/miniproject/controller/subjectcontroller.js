const subject = require("../model/subjectSchema");
const mongodb = require('mongodb')


exports.addsubject = async (req, res) => {
  const { subjectName,staffId} = req.body;

  subject
    .findOne({ subjectName: subjectName })
    .then((data) => {
      if (data) {
       return res.status(400).json({ message: "subject already created" });
      }
      const datas = new subject({
        subjectName: subjectName,
        staffId: staffId,
      });
      datas.save()
        .then((result) => {
          res.status(201).json({ message: "success" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  subject
    .findByIdAndDelete(id)
    .then((data) => {
      res.status(200).json({ message: "subject deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.getAllSubject = async (req, res) => {
  subject
    .find()
    .populate('staffId') 
    .then((data) => {
      if (!data) {
        res.status(200).json([]);
      }
      res.status(200).json(data);
    })
    .catch((err) => { 
      res.status(500).json({ message: err.message });
    });
};


exports.updateSubject = async (req, res) => {
  const _id = req.params.id

  const {subjectName,staffId} = req.body;
  subject
    .findByIdAndUpdate(
      _id,
      {
        $set: {
            subjectName: subjectName,
            staffId: staffId,
        },
      },
      { new: true }
    )
    .then((data) => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
