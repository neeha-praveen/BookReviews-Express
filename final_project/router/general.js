const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books},null,4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const ISBN = req.params.isbn;
  if(!ISBN){
    res.json({message:'no isbn given'})
  }
  else {
    reqBook = books[ISBN];
    if (reqBook<1) {
      res.json({success:false,message:'book not found'});
    } else {
      res.send(reqBook);
    }
  }
 });

const keys = Object.keys(books);

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  booksbyAuthor = [];
  keys.forEach((key)=>{
    if(books[key].author===author){
      booksbyAuthor.push(books[key]);
    }
  })
  if(booksbyAuthor.length===0){
    res.json("no books found by this author");
  }
  else {
    res.json({books:booksbyAuthor});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  keys.forEach((key)=>{
    if(books[key].title===title){
      res.json({book:books[key]});
    }
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
