# Authentication, Authorization, and RBAC System

This project implements an **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** system. The goal is to securely manage user sessions, define role-based permissions, and ensure authorized access to resources.

## Features

### 1. Authentication
- **Register:** Users can securely register using their credentials, which are hashed using `bcrypt` for secure storage.
- **Login:** Valid credentials are authenticated, and a **JWT token** is generated and stored in the browser's `localStorage`.
- **Logout:** Users can securely log out of the system.

### 2. Role-Based Access Control (RBAC)
- Users can create and manage businesses.
- Each business has roles assigned to its users, dictating access permissions:
  - **Administrator:** Full access to all options.
  - **Developer:** Access to Test products, Modify variables, View data.
  - **Tester:** Access to Test products and View data.
  - **Analyst:** Access to only view data.
- Roles determine what resources or endpoints the user can interact with.

### 3. Authorization
- All API endpoints (except registration and login) are protected with an **authentication middleware**.
- Authorization is enforced based on roles and permissions. Only users with appropriate roles can access certain resources or perform actions.

### 4. Business Management
- Upon logging in, a user can create a business and automatically becomes the **Administrator**.
- Administrators can:
  - Add users to their business.
  - Assign roles to users.
  - Modify role assignments or manage user permissions.
- Users can also be invited to other businesses and assigned roles by the respective Administrators.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express.js**: Web application framework.
- **MongoDB**: Database for storing user and business data.
- **JWT**: For secure session management.
- **Bcrypt**: For hashing passwords.
- **Validator**: For validating user input.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>