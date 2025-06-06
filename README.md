# 📚 Library Management System

A simple full-stack **Library Management System** that allows users to manage a collection of books. Built with **Spring Boot** for the backend and **React (Vite)** for the frontend.

---

![Book List Screenshot](screenshots/book-list.png)

---


## Live Demo

Check out the live app here: [Library Management System](https://library-management-1001.web.app/)

---

## 🧩 Tech Stack

- **Backend:** Spring Boot, Java, PostgreSQL (Supabase)
- **Frontend:** React (Vite), Axios, Tailwind CSS
- **Database:** Supabase PostgreSQL

---

## 🚀 Features

- 📘 Add new books
- ✏️ Edit existing books
- 🗑️ Delete books with confirmation
- 📋 View all books
- 🔄 Real-time updates after operations

---

## ⚙️ Getting Started

### 🖥️ Backend Setup

1. Update your PostgreSQL connection settings in application.properties:

```
spring.datasource.url=jdbc:postgresql://<your-db-url>:5432/<your-db-name>
spring.datasource.username=<your-username>
spring.datasource.password=<your-password>
```
2. Run the app locally:
```
mvn spring-boot:run
```
The backend will start on http://localhost:8080.

### 🖥️ Frontend Setup

1. Navigate to the frontend directory:
```
cd frontend
```
2. Install dependencies:
```
npm install
```
3. Set your backend URL in src/config/api.js:
```
export const API_BASE_URL = 'http://localhost:8080';
```
4. Start the development server:
```
npm run dev
```
The frontend will run on http://localhost:5173 (or similar).

📝 License

This project is licensed under the MIT License.