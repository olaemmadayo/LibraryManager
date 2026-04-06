require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database.js");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB
connectDB();

// routes
app.use("/authors", require("./routes/authorRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendants", require("./routes/attendantRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});