const Attendant = require("../models/attendant");

exports.createAttendant = async (req, res) => {
  try {
    const attendant = await Attendant.create(req.body);
    res.status(201).json(attendant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendants = async (req, res) => {
  try {
    const attendants = await Attendant.find();
    res.json(attendants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};