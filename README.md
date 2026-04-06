# 📚 School Library Management API

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## ⚙️ Setup Instructions

```bash
git clone <git@github.com:olaemmadayo/LibraryManager.git>
cd libaryManager
npm install
```

Create `.env` file:

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

Run project:

```bash
npm run dev
```

---

## 🔐 Authentication

### Register

POST `/auth/register`

### Login

POST `/auth/login`

Returns:

```
{
  "token": "JWT_TOKEN"
}
```

Use token:

```
Authorization: Bearer TOKEN
```

---

## 📚 API ENDPOINTS

### Authors

* POST /authors
* GET /authors
* GET /authors/:id
* PUT /authors/:id
* DELETE /authors/:id

---

### Books

* POST /books
* GET /books
* GET /books/:id
* PUT /books/:id
* DELETE /books/:id

---

### Borrow Book

POST `/books/:id/borrow`

---

### Return Book

POST `/books/:id/return`

---

## 🔍 Features

* JWT Authentication
* Role-based access
* Pagination & Search
* Data validation
* Borrow/Return logic

---


## 📌 Notes

* Books must be "IN" before borrowing
* Books must be "OUT" before returning

## Postman testing Link
https://temydizkid4me-1028403.postman.co/workspace/315cc1e9-9644-4e4a-8c80-88f3784a76c4/collection/53137372-22a7116f-8ce5-448a-a81d-ec50b9360be2?action=share&source=copy-link&creator=53137372