const syllabus = require('../model/syllabus')




exports.addSyllabus = async(req,res)=>{

const {subjectId,startDate,endDate,unit} = req.body

const data = new syllabus({
    subjectId:subjectId,
    startDate:startDate,
    endDate:endDate,
    unit:unit,
})
data.save().then((result)=>{

res.status(201).json(result)

}).catch((err)=>{
    res.status(500).json(err.message)
})

}


exports.updateSyllabus = async(req,res)=>{
   const id = req.params.id
    const {subjectId,startDate,endDate,unit} = req.body
    
    syllabus.findByIdAndUpdate(id,{
    $set:{
    subjectId:subjectId,
    startDate:startDate,
    endDate:endDate,
    unit:unit,
},
    },{new:true})
     
    .then((result)=>{
    
    res.status(201).json(result)
    
    }).catch((err)=>{
        res.status(500).json(err.message)
    })
    
    }


    exports.getSyllabusById = async(req,res)=>{
      const syllabusId = req.params.Id

      syllabus.findById(syllabusId).then((data)=>{

        res.status(200).json(data)
      }).catch((err)=>{

        res.status(500).json(err.message)
      })
    }
    
    exports.getSyllabusBySubject = async(req,res)=>{

        const subjectId = req.params.id

        syllabus.find({subjectId:subjectId}).populate('subjectId').then((data)=>{
            res.status(200).json(data)
        }).catch((err)=>{
            res.status(500).json(err.message)
        })
    }

