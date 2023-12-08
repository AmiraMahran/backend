const express = require("express");
const router = express.Router();

//import Methods

const { gitAllBooks, gitBookById, deleteBook, updateBook, createBook, addToCard }=require("../controllers/bookController") 



router.route("/").get(gitAllBooks);

router.route("/:id").get(gitBookById);

router.route("/").post(createBook);

router.route("/:id").put(updateBook);

router.route("/:id").delete(deleteBook);

router.route("/cards").post(addToCard);

module.exports=router;
