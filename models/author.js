const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  bio: String,
  dob: string
},
{timestamps: true});