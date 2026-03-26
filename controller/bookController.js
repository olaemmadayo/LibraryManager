const books = require("../models/books")


//crud for books

//borrowbook
exports.borrowbook = async (req, res) => {
  try {
    const {studentId, attendantId, returnDate} = req.body;

    const book = await books.findById(req.params.id)

    if(!book){
      return res.status(400).json({message: "book not found"})
    }

    if(book.status === "OUT"){
      return res.status(400).json({message: "book is already out"})
    }

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save()
    return res.status(400).json({message: "book borrowd suceefully"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({message: error})
    
  }
}