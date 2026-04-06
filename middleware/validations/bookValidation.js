const { body } = require("express-validator");

exports.createBookValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("isbn").notEmpty().withMessage("ISBN is required"),
  body("authors").isArray({ min: 1 }).withMessage("At least one author required"),
];