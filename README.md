# Daily Expense Sharing Application

This project is a backend implementation for a **Daily Expense Sharing** application, built with **Express.js**, **Node.js**, and **MongoDB**.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Testing with Postman](#testing-with-postman)
- [Screenshots](#screenshots)

---

## Features

- Add expenses and split the cost by percentage, equal, or exact amounts.
- Track expenses created by a user.
- Download a balance sheet in CSV format.
- JWT for authentication and authorization.

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/daily-expenses-convin.git
```
### 2. Clone the repository
```bash
cd daily-expenses-convin
npm install
```
### 3. Setup environment variables
- Create a .env file in the root directory and add the following values:
```bash
PORT=5000
DB_URI='mongodb+srv://tarunnemali2004:Iamtarun2004@cluster0.mnvfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' (I am providing my database url for your convenience)
JWT_SECRET='tarunsecret3846'
JWT_EXPIRE=5d
COOKIE_EXPIRE=5
```
### 4. Run the server

```bash
npm start
```


## User Routes

### 1. Register User
- **Endpoint:** `/api/v1/user/register`
- **Method:** `POST`
- **Description:** This endpoint allows a new user to register in the application.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "mobile": "string"
  }

### 2. Login User
- **Endpoint:** `/api/v1/user/login`
- **Method:** `POST`
- **Description:** This endpoint allows a user to login in the application.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string",
  }

### 3. Logout User
- **Endpoint:** `/api/v1/user/logout`
- **Method:** `GET`
- **Description:** This endpoint allows a user to logout from the application.

### 4. Get User Details by ID
- **Endpoint:** `/api/v1/user/:id`
- **Method:** `GET`
- **Description:** This endpoint retrieves the details of a single user by their ID.
- **Parameters:** `id`: The unique identifier of the user.




## Expense Routes


### 1. Add Expense
- **Endpoint:** `/api/v1/expenses/add`
- **Method:** `POST`
- **Description:**  This endpoint allows a logged-in user to add a new expense.
- **Request Body:**
  ```json
  {
  "description": "string",
  "amount": "number",
  "splitType": "string",
  "participants": ["string"]
  }
- Example json data
  ```json
  {
  "description": "Dinner at the restaurant",
  "amount": 3000,
  "splitType": "equal",
  "participants": [
    {
      "user": 67150b34159621d2cbf808c0,
    },
    {
      "user": 6715168ab99b6ec12ca35583,
    },
    {
      "user": 671516a9b99b6ec12ca35587
    }
  ]
  }


### 2. Get Expenses by User ID
- **Endpoint:** `/api/v1/expenses/get/:userId`
- **Method:** `GET`
- **Description:** This endpoint retrieves all expenses for a particular user by their user ID. The user must be logged in.
- **Parameters:** `userId`: The unique identifier of the user.


### 3. Get All Expenses
- **Endpoint:** `/api/v1/expenses/all`
- **Method:** `GET`
- **Description:** This endpoint retrieves all expenses for all users. The user must be logged in.


### 3. Download Balance Sheet
- **Endpoint:** `/api/v1/expenses/download`
- **Method:** `GET`
- **Description:** This endpoint allows a logged-in user to download their balance sheet in CSV format




