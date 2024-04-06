const departmentmodel = require('../models/Departments.js')
const facultymodel = require('../models/Faculties.js')


exports.addDepartment = async (req, res) => {
    try {
        const facultyname = req.body.facultyname;
        const faculty = await facultymodel.findOne({ name: facultyname });
        if (!faculty) {
            return res.status(404).json({
                error: "Faculty not found"
            });
        }
        const newdepartment = await departmentmodel.create({ faculty: faculty._id, departmentname: req.body.departmentname });
        res.status(200).json({
            message: "Successfully Added The Department"
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


exports.getAlldepartments = async (req,res) =>{

    try{
        const departments = await departmentmodel.find().populate({
            path: 'faculty',
            select: 'name'
          });
    res.status(200).json({
    data : departments
    
    
    })
    
    }catch(err){
    
    res.status(404).json({
    error : err.message
    })
    }
    }




exports.finddepartment= async (req,res) =>{
    try{
    const department =  await departmentmodel.findById(req.params.id)
    res.status(200).json({
    data : department
    
    })
    
    
    }catch(err){
    
    res.status(404).json({
    
    error : err.message
    
    })
    }
    }
    exports.findDepartmentsByFacultyId = async (req, res) => {
      try {
          const departments = await departmentmodel.find({ faculty: req.params.facultyId });
          res.status(200).json({
              data: departments
          });
      } catch (err) {
          res.status(404).json({
              error: err.message
          });
      }
  };
    
    exports.DeleteDepartment = async (req,res)=>{
    try{
        const id  = await req.params.id
        const deleteddepartment = await departmentmodel.findByIdAndDelete(id)
    
        res.status(200).json({
    message : "Successfully Deleted"
    
        })
        
    
    }catch(err){
    res.status(404).json({
    
    error : err.message
    
    })
    }
    
    }
    
    
    
    
    exports.Updatedepartment = async(req,res)=>{
    try{
        const Updateddepartment = await departmentmodel.findByIdAndUpdate(req.params.id , req.body ) 
    res.status(200).json({
message : "Successfully Updated"

    })
    
    }catch(err){
    res.status(404).json({
    
    error: err.message
    
    })
    
    }
    
    }