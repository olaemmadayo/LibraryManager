const express = require("express");
const router = express.Router();
const controller = require("../controllers/attendantController");

router.post("/", controller.createAttendant);
router.get("/", controller.getAttendants);

module.exports = router;