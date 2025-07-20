const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
  const validuser = users.filter((user)=>user.username===username);
  if(validuser.length>0){
    return true;
  } else {
    return false;
  }
}

const authenticatedUser = (username,password)=>{ 
  const realUser = users.filter((user)=>{
    return user.username===username && user.password===password;
  })
  if (realUser.length>0) {
    return true;
  } else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username=req.body.username;
  const password=req.body.password;
  if(username && password){
    if (isValid(username)){
      if(authenticatedUser(username,password)) {
        let accessToken = jwt.sign({
          data:password
        },'access',{expiresIn:60*60});

        req.session.authorization = { accessToken, username }
        res.json({success:true, message:'successfully logged in'})
      } else {
        res.json({success:false, message: 'invalid credentials'});
      }
    } else {
      res.json({success:false, message:'user does not exist'});
    }
  } else {
    res.json({success:false, message:'error logging in'})
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.session.authorization.username;
  const review = req.query.review;
  const ISBN = req.params.isbn;

  if(!books[ISBN]) {
    res.json({success:false,message:'book not found'});
  }
  if(!review) {
    res.json({success:false, message:'no review given'});
  }

  let book = books[ISBN];
  book.reviews[username] = review;
  res.json({success:true,message:'review posted successfully',bookReviews:book.reviews});
});

regd_users.delete("/auth/review/:isbn",(req,res)=>{
  const username = req.session.authorization.username;
  const ISBN = req.params.isbn;
  let book = books[ISBN];
  delete book.reviews[username];
  res.json({success:true, message:'review deleted', bookReviews: book.reviews});
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
