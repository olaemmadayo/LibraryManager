const mongoose = require("mongoose")

//connect to database
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.mongodb)
    console.log("MongoDB is successfully connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}