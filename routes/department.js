const express = require('express')

const departmentrouter = express.Router()
const departcontroller = require('../controllers/derpartmetCtl')

departmentrouter.post('/createdepartment' , departcontroller.addDepartment)
departmentrouter.get('/alldepartments' , departcontroller.getAlldepartments)
departmentrouter.get('/:id' , departcontroller.finddepartment)
departmentrouter.get('/getByFacultyId/:id', departcontroller.findDepartmentsByFacultyId)
departmentrouter.patch('/:id' , departcontroller.Updatedepartment)
departmentrouter.delete('/:id' , departcontroller.DeleteDepartment)









module.exports = departmentrouter