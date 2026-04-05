const Student = require("../models/student");

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};