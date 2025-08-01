# 📚 LibraryVerse - A Modern Library Management System

![LibraryVerse Hero](screenshots/landing.png) 

**LibraryVerse** is a modern, full-stack library management system designed to serve both private university collections and open public libraries. Built with a robust Java Spring Boot backend and a dynamic React frontend, this platform provides a seamless and secure experience for managing books, tracking loans, and connecting readers with information.

**[🚀 Live Demo Link](https://library-management-1001.web.app/)** 

---

## ✨ Key Features

LibraryVerse features a sophisticated role-based access model tailored to the unique needs of different users:

#### 🧑‍🎓 For Students
- **Browse University Books:** Search and filter all available books in the university library.
- **View Issued Books:** Keep track of currently borrowed books and view borrowing history.
- **Edit Profile:** Update personal details and manage account settings, including password changes.
- **View University Staff:** Access contact information for university administrators and librarians.

![Student Section](screenshots/student.png) 

#### 👩‍🏫 For Librarians
- **Book Management:** Easily add new books to the collection and view all existing books.
- **Issue & Return Books:** A streamlined, intuitive interface for managing book loans.
- **Track All Issued Books:** View a complete history of all issued and returned books.

![Librarian Section](screenshots/librarian.png)

#### 👑 For Admins
- **Librarian Management:** Add or delete librarian accounts for the institution.
- **Student Management:** View and manage all student accounts within the university.
- **University Management:** Update institution details or manage public library information.

![Admin Section](screenshots/admin.png)

#### 🌐 General Features
- **Dual Library System:** Supports both private university libraries and open-access public libraries.
- **Secure Authentication:** JWT-based authentication with role-based access control (RBAC).
- **Aesthetic UI/UX:** A beautiful, modern interface built with React, Tailwind CSS, and Framer Motion for smooth animations.
- **Light & Dark Mode:** A stunning theme that adapts to user preference.
- **Fully Responsive:** A seamless experience on any device, from mobile to desktop.


![Public Library Section](screenshots/publiclibrary.png)

![Public Library Book Section](screenshots/publiclibrary2.png)
---

## 🛠️ Technology Stack

| Category      | Technology                                                              |
|---------------|-------------------------------------------------------------------------|
| **Frontend** | React, React Router, Redux, Tailwind CSS, shadcn/ui, Framer Motion, Axios |
| **Backend** | Java, Spring Boot, Spring Security, Spring Data JPA, Maven              |
| **Database** | PostgreSQL                            |
| **DevOps** | Docker, Google Cloud Platform (GCP)                                     |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites
- Java 17+
- Maven
- Node.js & npm/yarn

### Backend Setup
1.  Clone the repository:
    ```sh
    git clone https://github.com/chahatsharma1/digital-library.git
    ```
2.  Navigate to the `src` directory.
3.  Install dependencies:
    
4.  Configure your `application.properties` file with your database credentials.
5.  Run the application:
    ```sh
    mvn spring-boot:run
    ```

### Frontend Setup
1.  Navigate to the `frontend` directory.
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Start the development server:
    ```sh
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) (or your configured port) to view it in the browser.
