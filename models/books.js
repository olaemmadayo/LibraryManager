const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  isbn: {type: String, required: true},
  authors: [{type: mongoose.Schema.Types.ObjectId, ref: "author"}],
  status: {type: string,
    enum: ["IN", "OUT"],
    default: "IN"
  },
  borrowedBy: {type: mongoose.Schema.Types.ObjectId, ref:"student"},
  issuedBy: {type: mongoose.Schema.Types.ObjectId,  ref:"attendant"},
  issueDate: {type: Date, default: null},
  returnDate: {type: Date, default: null}
},
{timestamps: true});