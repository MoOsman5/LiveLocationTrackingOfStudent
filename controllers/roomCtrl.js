const roommodel = require("../models/Rooms.js");
const usermodel = require("../models/Rooms.js");
const departmentmodel = require("../models/Departments.js");

exports.createroom = async (req, res) => {
  try {
    const departmentname = await req.body.departmentname;
    const department = await departmentmodel.findOne({
      departmentname: departmentname,
    });
    const Room = await roommodel.create({
      department: department._id,
      roomname: req.body.roomname,
    });

    res.status(200).json({
      message: "Successfully Created The Room",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

exports.getAllrooms = async (req, res) => {
  try {
    const Rooms = await roommodel.find();
    res.status(200).json({
      data: Rooms,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

exports.findderoom = async (req, res) => {
  try {
    const room = await roommodel.findById(req.params.id);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

exports.Deleteroom = async (req, res) => {
  try {
    const id = await req.params.id;
    const deletedroom = await roommodel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Successfully Deleted",
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

exports.Updatedroom = async (req, res) => {
  try {
    const Updatedroom = await roommodel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).json("Successfully Ubdated");
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};

exports.getDetailedroom = async (req, res) => {
  try {
    const roomid = await req.params.id;
    const details = await roommodel.find({ _id: roomid }).populate({
      path: "department",
      select: "departmentname faculty",
      populate: {
        path: "faculty",
        select: "name",
      },
    });
    res.status(200).json({
      data: details,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.enrollToRoom = async (req, res) => {
  try {
    const roomid = await req.params.id;
    const students = await req.body.students;

    //if The Room Doesnt Exist
    console.log(roomid);
    if (!roommodel.findById(roomid)) {
      console.log("here");
      return res.status(404).json({
        message: "The Room Doesn,t Exist",
      });
    }

    //if The Student Add Before
    const room = await roommodel.findOne({ _id: roomid });
    //if There is No Array

    if (!room.students) {
      room.students = [];
    }

    if (room.students.includes(students)) {
      return res.status(404).json({
        message: "This Student Added Before",
      });
    }

    room.students.push(students);
    await room.save();

    return res.status(200).json({ message: "Student Enrolled Successfully" });
  } catch (err) {
    return res.status(404).json({
      error: err.message,
    });
  }
};

exports.showUsers = async (req, res) => {
  try {
    const roomid = await req.params.id;
    const room = await roommodel.findOne({ _id: roomid });
    if (!room) {
      return res.status(404).json({
        message: "This Room Dosen,t Exist",
      });
    }

    const users = await room.populate("students", "Username");

    return res.status(200).json({
      users,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.getLivePosition = async (req, res) => {
  try {
    const roomid = await req.params.id;
    const student = await req.body.students;
    const room = await roommodel.findOne({ _id: roomid });

    const studentPosition = await room.populate({
      path: "students",
      match: { _id: { $eq: student } },
      select: "latitude longitude ",
    });

    return res.status(200).json({
      message: "Here is The Live Position",
      data: studentPosition,
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.findroomsbydepartmentid = async (req, res) => {
  try {
    const rooms = await roommodel
      .find({ department: req.params.DepartmentId })
      .select("roomname");

    console.log(rooms);

    res.status(200).json({
      data: rooms,
    });
  } catch (err) {
    res.status(404).json({
      error: err.message,
    });
  }
};
