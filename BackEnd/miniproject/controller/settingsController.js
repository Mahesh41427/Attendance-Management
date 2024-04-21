const settings = require('../model/settings')






exports.createSettings = async(req,res)=>{
    console.log("entererd")

    const {TotalWorkingDays,department,semesterStartDate} = req.body

    try{
      const settingsData = await settings.find()

      console.log(settingsData)
      
      if(settingsData.length>0){
        return res.status(400).json("settings already created please update ")
      }
            const newSettings = new settings({
                TotalWorkingDays:TotalWorkingDays,
                Department:department,
                semesterStartDate:semesterStartDate,
            })

            const result = await newSettings.save()
    if(result){

        res.status(201).json(result)
    }
    }
catch(err){
    res.status(500).json(err.message)
}
}

exports.updateSettings = async(req,res)=>{
const id = req.params.id

    const {TotalWorkingDays,Department,semesterStartDate} = req.body

    try{

        const updateSettings = await settings.findByIdAndUpdate(id,{

            $set:{
                TotalWorkingDays:TotalWorkingDays,
                Department:Department,
                semesterStartDate:semesterStartDate
            }
        },{new:true})

           
    if(updateSettings){

        res.status(201).json(updateSettings)
    }
    }
catch(err){
    res.status(500).json(err.message)
}

}


exports.getAllSettings = async(req,res)=>{
console.log('entered')
try{
    const setting = await settings.find()

    console.log(setting)
    if(setting.length < 1){
        return res.status(200).json([])
    }
       res.status(200).json(setting)
}
catch(err){
    res.status(500).json(err.message)
}

}








