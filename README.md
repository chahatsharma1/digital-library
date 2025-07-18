# Library Management System 📚

A full-stack Library Management System built with Spring Boot and React. This application supports two primary modes:

* **University Library**: Designed for academic institutions with features for managing departments, courses, and student borrowing history.
* **Public Library**: Tailored for public usage, allowing anyone to browse, borrow, and track books.

![Book List Screenshot](screenshots/book-list.png)

## 🚀 Live Deployment

Check out the live app here: [Library Management System](https://library-management-1001.web.app/)

## 🌟 Features

### 🔸 University Library

* Department and course-based book categorization
* Student-specific borrowing and return tracking
* Admin dashboard for university librarians

### 🔸 Public Library

* Open access to browse available books
* Authenticated borrowing and return operations
* Clean, responsive user interface

## 🛠 Tech Stack

* **Backend**: Spring Boot, Hibernate, PostgreSQL, REST APIs
* **Frontend**: React, Tailwind CSS, Redux
* **Deployment**: Docker, Google Cloud Run, GitHub Actions (CI/CD)

## 🧪 How to Run Locally

### Backend

```
cd library-backend
mvn clean install
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

### Frontend

```
cd library-frontend
npm install
npm start
```


## 🧹 Future Improvements

* Notifications for due dates
* Enhanced analytics dashboard