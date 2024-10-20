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




