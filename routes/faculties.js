const express = require('express')

const facultyrouter = express.Router()
const facultycontroller = require('../controllers/facultyCtl.js')

facultyrouter.get('/allfaculties ' , facultycontroller.getAllfaculty)
facultyrouter.get('/:id' ,facultycontroller.findfaculty)
facultyrouter.post('/addfaculty' , facultycontroller.AddFaculty)
facultyrouter.patch('/:id' , facultycontroller.Updatefaculty)
facultyrouter.delete('/:id' , facultycontroller.DeleteFaculty)










module.exports = facultyrouter