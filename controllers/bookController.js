const Book = require("../models/book");
const Student = require("../models/student");
const Attendant = require("../models/attendant");

// CREATE
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "ISBN must be unique" });
    }
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getBooks = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// BORROW BOOK
exports.borrowBook = async (req, res) => {
  try {
    const { studentId, attendantId, returnDate } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RETURN BOOK
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.status === "IN") {
      return res.status(400).json({ message: "Book already returned" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};