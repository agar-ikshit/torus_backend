# 🌀 Torus Task Management – Backend

This is the **backend** of the [Torus Task Management](https://github.com/agar-ikshit/torus_backend) application – a task management system built with **Node.js**, **Express**, and **MongoDB**.  
It provides secure JWT-based authentication and a set of RESTful APIs to create, assign, update, delete tasks, and generate task summaries.

---

## ✨ Features

- **User Authentication**
  - Register and login using secure JWT tokens
- **Task Management**
  - Fetch task list
  - Add new tasks
  - Assign tasks to users (admin only)
  - Update task status
  - Delete tasks
- **Reporting**
  - Generate and download task summaries in **JSON** or **CSV** formats

---

## ⚙️ Tech Stack

- **Node.js** & **Express.js** – API server
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **JWT** – Authentication
- **bcrypt** – Password hashing

---
## Front end (https://github.com/agar-ikshit/torus_task_management)

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/agar-ikshit/torus_backend.git
cd torus_backend

# Install dependencies
npm install

# Create a .env file in the root directory with the following:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000 (or any port)

# Start the server in development mode
npm start


