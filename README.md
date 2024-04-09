# Library Management System

This project aims to develop a comprehensive Library Management System using TypeScript, React 18, MySQL, Spring Boot, and Spring Security. The system is designed to streamline library operations, enhance user experience, and automate key processes.

## Problem Statement

### Objective
The objective is to design and implement a comprehensive Library Management System to streamline library operations, enhance user experience, and automate key processes for a library.

### Scope
1. **Registration and Authentication:** Allow users to register, log in, and securely manage their accounts.
2. **Book Catalog and Inventory:** Manage a digital catalog of all available books and automatically update the inventory as books are borrowed or returned.
3. **Borrowing and Returning Books:** Allow users to borrow and return books through a user-friendly interface and Set borrowing limits and due dates.
4. **Reservation System:** Enable users to reserve books that are currently on loan.
5. **Late Fee Calculation:** Automatically calculate and notify users about late fees for overdue books.
6. **Search and Filter Functionality:** Implement a robust search and filter system for users to easily find books based on various criteria.
7. **Email Notifications:** Send automated email notifications for overdue books, reservation confirmations, and other relevant updates.

### Technologies Used
- **Frontend:** TypeScript, React.js
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT) for secure user authentication

## Use Cases

### Actor: User/Employee
- **User/Employee Registration and login**
- **View book Catalog**
- **Borrow/Return Books**
- **View history of borrowed books**
- **View fine for late return**
- **View and reserve the book in loan**

### Actor: Administrator
- **Log In**
- **Manage Book Catalog**
- **Manage Book Categories**
- **Manage users**
- **View all borrowed books, total fine, individual user fine**

### System: Security and Authentication
- **Authenticate User**

### System: Database Management
- **Store Book Information**
- **Store Book genre Information**
- **Store Borrowed Book with fine amount details Information**
- **Store Book Reservation Information**

## Development Process

### User Registration and Admin Login
1. **User and Admin Account Creation:** Users and admins can create accounts, providing personal details (name, gender, contact number, address, etc.).
2. **Validation and Profile Creation:** The system validates the information and creates user profiles.
3. **User and Admin Login:** Employees and admins log in using their credentials (username/email and password).

### User Dashboard
1. **Browse Book Catalog:** Users can browse available books, view detailed descriptions, images, etc.
2. **Search and Filter:** Users can search for specific items and filter books based on various criteria.
3. **Borrowing and Returning:** Users can borrow and return books, with borrowing limits and due dates.
4. **Reservation:** Users can reserve books that are currently on loan.
5. **View History:** Users can view their history of borrowed books, including fines for late returns.

### Admin Dashboard
1. **Manage Book Catalog:** Add, delete, and update book information.
2. **Manage Categories:** Add and delete book categories.
3. **Manage Users:** Manage user accounts.
4. **View Reports:** View reports on borrowed books, returned books, and reservations.
5. **Send Notifications:** Send notifications for overdue books and return requests.

### Security and Compliance
- **JWT Authentication:** Implement JWT for user authentication and authorization.
- **Logout:** Invalidate JWT tokens on both client and server upon logout.

## Project Development Guidelines

### Backend Development
- Use REST APIs (Spring Boot) for services.
- Implement JWT for security.
- Perform backend data validation.
- Implement Swagger for API documentation.
- Implement logging and unit testing.

### Frontend Constraints
1. **Layout and Structure:** Use a responsive grid system for layout organization.
2. **Visual Elements:** Design attractive forms, buttons, and error messages.
3. **Color Scheme and Typography:** Choose a consistent color scheme and typography.
4. **Registration and Login Pages:** Include fields for registration and login, with validation and error handling.
5. **Common to React:** Implement routing, forms, and validations.

## Conclusion

This Library Management System aims to enhance library operations and user experience through efficient book management, user-friendly interfaces, and automated processes. By leveraging modern technologies and following development best practices, we aim to deliver a robust and scalable solution.
