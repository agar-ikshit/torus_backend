# 🌀 Torus Task Management – Backend

This is the **backend** of the Torus Task Management application – a task management system built with **Node.js**, **Express**, and **MongoDB**.  
It provides secure JWT-based authentication and a set of RESTful APIs to create, assign, update, delete tasks, and generate task summaries.

---
🚀 Deployment
Backend is hosted on Render.

Frontend is hosted on Vercel: https://torus-task-management.vercel.app/

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

📡 API Endpoints Overview
Method	Route	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive JWT token
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Add a new task
PUT	/api/tasks/:id	Update a task (e.g., status, assignment)
DELETE	/api/tasks/:id	Delete a task
GET	/api/tasks/summary	Download task summary as JSON or CSV

⚠️ Note: Some routes are admin-protected.

📄 License
This project is licensed under the MIT License.

🔗 Related Projects
Frontend Repository: [torus_task_management](https://github.com/agar-ikshit/torus_task_management)

Live Frontend App: https://torus-task-management.vercel.app/

✏️ Author
Ikshit Agarwal
GitHub

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
npm run dev
The backend will run locally at: http://localhost:5000
```
📂 Example .env file
env
Copy
Edit
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key
PORT=5000
✅ Contributing
Fork the repository

Create your feature branch (git checkout -b feature/YourFeature)

Commit your changes (git commit -m 'Add some feature')

Push to the branch (git push origin feature/YourFeature)

Open a pull request
