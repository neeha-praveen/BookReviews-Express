# Book Store API 

This is a final project for the IBM course **Developing Back-End Apps with Node.js and Express**. 
The original repo was provided as part of the course materials for completing the final project.

---

## About 
This project is a basic **Book Store API** built with **Express.js**.  
It supports:
- User **registration & login** (with JWT + session auth)
- Viewing a **book list**
- Fetching **books by ISBN, Author, Title**
- Adding/Updating **book reviews** 
- Demonstrating **Async/Await** + **Axios** API calls 

---

## Endpoints Overview

| Type   | Endpoint                              | Purpose                         |
|--------|----------------------------------------|---------------------------------|
| Public | /register                              | Register new user                |
| Public | /isbn/:isbn                            | Get book by ISBN                 |
| Public | /author/:author                        | Get books by author              |
| Public | /title/:title                          | Get books by title               |
| Public | /review/:isbn                          | Get book reviews                 |
| Auth   | /customer/login                        | User login                       |
| Auth   | /customer/auth/review/:isbn            | Add or update book review (user) |


---

## Async/Await + Axios Endpoints (Tasks 10-13)
| Endpoint                        | Purpose                      |
|---------------------------------|-------------------------------|
| /async-books                    | Get all books (Axios)         |
| /async-books/isbn/:isbn         | Get book by ISBN (Axios)      |
| /async-books/author/:author     | Get books by author (Axios)   |
| /async-books/title/:title       | Get books by title (Axios)    |

---

## How to Run
### 1. Install Dependencies
```bash
cd final_project/
npm install
```
### 2. Run the app
```bash
node index.js
```
The server will run at:
```bash
http://localhost:5000
```

---

## Acknowledgment
This project is based on the starter code provided by the IBM Coursera Course: "Developing Back-End Apps with Node.js and Express".  
I completed the final project by implementing all required functionality and tasks as per course guidelines.
