const Attendant = require("../models/attendant");

exports.createAttendant = async (req, res) => {
  const attendant = await Attendant.create(req.body);
  res.status(201).json(attendant);
};

exports.getAttendants = async (req, res) => {
  const attendants = await Attendant.find();
  res.json(attendants);
};