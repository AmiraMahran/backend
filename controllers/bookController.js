

const asyncHandler = require("express-async-handler");

const { validateCreateBook, validateUpdateBook, Book } = require("../models/Book")



//decumentation 
/**
 * @desc Get all books
 * @route /api/books
 * @method Get
 * @access public
 */

const gitAllBooks = asyncHandler(async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
}
)


/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method Get
 * @access public
 */

const gitBookById = asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({ messge: "book not found" });
    }

})

/**
 * @desc Create New Book 
 * @route /api/books
 * @method Post
 * @access private(only Admin)
 */

const createBook = asyncHandler(async (req, res) => {

    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ messge: error.details[0].message });
    }
    const book = new Book(
        {
            bookTitle: req.body.bookTitle,
            authorName: req.body.authorName,
            imageURL: req.body.imageURL,
            category: req.body.category,
            bookDescription: req.body.bookDescription,
            bookPDFURL: req.body.bookPDFURL
            
        }
    )

    const result = await book.save();
    res.status(201).json(result);
});

/**
 * @desc Update a Book 
 * @route /api/books/:id
 * @method Put
 * @access private(only Admin)
 */

const updateBook = asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            bookTitle: req.body.bookTitle,
            authorName: req.body.authorName,
            imageURL: req.body.imageURL,
            category: req.body.category,
            bookDescription: req.body.bookDescription,
            bookPDFURL: req.body.bookPDFURL
        }
    }, { new: true })
    res.status(200).json(updateBook)
})


/**
 * @desc Delete a Book 
 * @route /api/books/:id
 * @method Delete
 * @access private(only Admin)
 */

const deleteBook = asyncHandler(async (req, res) => {
    //Check the book is find or not
    const book = await Book.findById(req.params.id)
    if (book) {
        await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "book has been Deleted" });
    } else {
        res.status(404).json({ message: "book not found" })
    }

})



/**
 * @desc add book to card
 * @route /api/books/cards
 * @method Post
 * @access public
 */

// Define the route to add a card
const addToCard = asyncHandler((req, res) => {
    const { bookTitle, bookDescription } = req.body;

    let cards = [];

    // Validate request data
    if (!bookTitle || !bookDescription) {
        return res.status(400).json({ error: 'Title and description are required.' });
    }

    // Create a new card
    const newCard = { id: cards.length + 1, bookTitle, bookDescription };

    // Add the card to the database (in-memory array in this example)
    cards.push(newCard);

    // Respond with the newly created card
    res.status(201).json(newCard);
});
module.exports = { gitAllBooks, gitBookById, createBook, updateBook, deleteBook, addToCard };


