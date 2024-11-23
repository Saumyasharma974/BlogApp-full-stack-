# Blog App - MERN Stack

This is a blog application built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) that provides functionality such as user login/logout, CRUD operations for blogs, and an admin dashboard to manage the blog content. The application supports trending blogs, devotional blogs, and allows blog updates.

## Features

- **User Authentication:**
  - User login and logout functionality.
  - Registration and login system with password hashing.
  
- **CRUD Operations for Blogs:**
  - Create, read, update, and delete blogs.
  - Admin users can perform CRUD operations while regular users can view and comment on blogs.

- **Admin Dashboard:**
  - The admin can view all blogs and update content.
  - The admin can mark certain blogs as trending or devotional.
  - Admin can delete unwanted or inappropriate blogs.

- **Blog Categories:**
  - Blogs are categorized as **Trending** and **Devotional**.
  - Users can filter blogs based on category.

- **Responsive UI:**
  - The front end is built using **React** with a focus on a clean, modern design.
  - Fully responsive design, optimized for both desktop and mobile views.

- **RESTful API:**
  - The backend is powered by **Node.js** with **Express.js** to handle API requests for blogs and user authentication.
  - JWT (JSON Web Tokens) for user authentication and authorization.

## Tech Stack

- **Frontend:**
  - **React.js** - For building the user interface.
  - **React Router** - For navigation between different pages.
  - **Axios** - For making API requests.

- **Backend:**
  - **Node.js** - Server-side JavaScript runtime.
  - **Express.js** - Web framework for Node.js.
  - **MongoDB** - Database to store blog data and user information.
  - **Mongoose** - MongoDB object modeling for Node.js.
  - **JWT (JSON Web Tokens)** - For secure user authentication.

- **Authentication:**
  - **bcrypt.js** - Password hashing for user registration and login.
  - **JWT** - Secure token-based authentication for user sessions.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your system.
- MongoDB instance (either local or cloud, e.g., MongoDB Atlas).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/blog-app.git
   cd blog-app
   ```

2. **Install dependencies for both client and server:**

   - Navigate to the `client` folder and install frontend dependencies:
     ```bash
     cd client
     npm install
     ```
   
   - Navigate to the root directory and install backend dependencies:
     ```bash
     cd ..
     npm install
     ```

3. **Set up environment variables:**

   - Create a `.env` file in the root directory with the following environment variables:
     ```
     MONGO_URI=your-mongo-db-connection-string
     JWT_SECRET=your-jwt-secret-key
     PORT=5000
     ```

   - Replace `your-mongo-db-connection-string` with your MongoDB connection string and `your-jwt-secret-key` with a secret key of your choice for JWT.

4. **Start the application:**

   - Run the backend server:
     ```bash
     npm start
     ```

   - Run the frontend client:
     ```bash
     cd client
     npm start
     ```

   - The app will now be running on `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

## Routes & API Endpoints

### Authentication

- **POST /api/auth/login**: Login a user and get a JWT token.
- **POST /api/auth/register**: Register a new user.
- **GET /api/auth/logout**: Logout the current user.

### Blogs

- **GET /api/blogs**: Get all blogs.
- **POST /api/blogs**: Create a new blog (admin only).
- **GET /api/blogs/:id**: Get a specific blog by its ID.
- **PUT /api/blogs/:id**: Update a blog by its ID (admin only).
- **DELETE /api/blogs/:id**: Delete a blog by its ID (admin only).

### Admin Dashboard

- **GET /api/admin/blogs**: Get all blogs in the admin dashboard.
- **PUT /api/admin/blogs/:id/trending**: Mark a blog as trending.
- **PUT /api/admin/blogs/:id/devotional**: Mark a blog as devotional.

## Admin Features

- Admin can log in with credentials and access the admin dashboard.
- Admin can perform CRUD operations on blogs.
- Admin can mark blogs as "Trending" or "Devotional" to categorize them.

## Future Enhancements

- Add comment functionality to blogs.
- Add a rich text editor for writing and editing blogs.
- Implement email notifications for users when a blog is updated or commented on.
- Add search functionality for finding blogs by title or category.

## Conclusion

This Blog App is a robust platform built with the **MERN Stack** that allows users to read and interact with blogs, while administrators have full control over the blog content. The use of JWT ensures secure authentication and authorization for different types of users (admin and regular users). The app is designed to be scalable and can be easily extended with additional features.
