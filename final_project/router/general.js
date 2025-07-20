const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username) => {
  let userexists = users.filter((user)=>user.username===username)
  if(userexists.length===0){
    return false;
  } else {
    return true;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password){
    if(doesExist(username)) {
      res.json({message:'user already exists'});
    } else {
      users.push({'username':username,'password':password});
      res.json({success:true,message:'successfully registered'});
    }
  } else {
    res.json({success:false,message:'error registering'});
  }
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
  const ISBN = req.params.isbn;
  review=books[ISBN].review;
  res.send(JSON.stringify({review},null,4));
});

module.exports.general = public_users;
