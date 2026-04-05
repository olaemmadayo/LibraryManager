const Book = require("../models/book");
const Student = require("../models/student");
const Attendant = require("../models/attendant");

// CREATE
exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

// GET ALL + PAGINATION + SEARCH
exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  let query = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  const books = await Book.find(query)
    .populate("authors")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(books);
};

// GET ONE
exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate("authors")
    .populate("borrowedBy")
    .populate("issuedBy");

  res.json(book);
};

// UPDATE
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

// DELETE
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};

// BORROW BOOK
exports.borrowBook = async (req, res) => {
  const { studentId, attendantId, returnDate } = req.body;

  const book = await Book.findById(req.params.id);

  if (book.status === "OUT") {
    return res.status(400).json({ message: "Book already borrowed" });
  }

  const student = await Student.findById(studentId);
  const attendant = await Attendant.findById(attendantId);

  if (!student || !attendant) {
    return res.status(404).json({ message: "Invalid student or attendant" });
  }

  book.status = "OUT";
  book.borrowedBy = studentId;
  book.issuedBy = attendantId;
  book.returnDate = returnDate;

  await book.save();

  res.json(book);
};

// RETURN BOOK
exports.returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book.status === "IN") {
    return res.status(400).json({ message: "Book already returned" });
  }

  book.status = "IN";
  book.borrowedBy = null;
  book.issuedBy = null;
  book.returnDate = null;

  await book.save();

  res.json(book);
};