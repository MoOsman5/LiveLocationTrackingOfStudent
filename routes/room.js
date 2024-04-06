const express = require('express')

const roomrouter = express.Router()
const roomcontroller = require('../controllers/roomCtrl.js')

roomrouter.delete('/:id ', roomcontroller.Deleteroom)
roomrouter.get('/allrooms' , roomcontroller.getAllrooms)
roomrouter.get('/getByDepartmentId/:DepartmentId', roomcontroller.findroomsbydepartmentid)
roomrouter.get('/:id' , roomcontroller.findderoom)
roomrouter.get('/detailedroom/:id'  , roomcontroller.getDetailedroom)
roomrouter.patch('/:id' , roomcontroller.Updatedroom)
roomrouter.post('/CreateRoom' , roomcontroller.createroom)
roomrouter.post('/enrollToRoom/:id' , roomcontroller.enrollToRoom)
roomrouter.get('/ShowUsersinRoom/:id' , roomcontroller.showUsers )
roomrouter.get('/TrackLivePosition/:id' , roomcontroller.getLivePosition )







module.exports = roomrouter