const express = require('express')

const roomrouter = express.Router()
const roomcontroller = require('../controllers/roomCtrl.js')

roomrouter.delete('/:id ', roomcontroller.Deleteroom)
roomrouter.get('/allrooms' , roomcontroller.getAllrooms)
roomrouter.get('/:id' , roomcontroller.findderoom)
roomrouter.get('/detailedroom/:id'  , roomcontroller.getDetailedroom)
roomrouter.patch('/:id' , roomcontroller.Updatedroom)
roomrouter.post('/CreateRoom' , roomcontroller.createroom)






module.exports = roomrouter