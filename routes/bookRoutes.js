const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validations/validationMiddleware");
const { createBookValidation } = require("../middleware/validations/bookValidation");

// All routes are protected and require ADMIN role
router.use(protect);
router.use(authorize("ADMIN", "ATTENDANT"));

router.post("/", validate, createBookValidation, controller.createBook);
router.get("/", controller.getBooks);
router.get("/:id", controller.getBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

router.post("/:id/borrow", controller.borrowBook);
router.post("/:id/return", controller.returnBook);

module.exports = router;