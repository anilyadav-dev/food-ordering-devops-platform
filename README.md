# Food Ordering DevOps Platform

This is a full-stack food ordering application built to practice real-world DevOps skills.

---

## 🚀 Project Goal

This project helps to learn how to:

- Build a full-stack application (Frontend + Backend + Database)
- Containerize applications using Docker
- Deploy using Kubernetes
- Automate tasks using Bash scripts
- Implement CI/CD pipelines
- Monitor applications using Prometheus and Grafana

---

## 🧱 Tech Stack

### Application

- Frontend: React (Coming soon)
- Backend: Node.js + Express (Coming soon)
- Database: MongoDB (Docker)

### DevOps Tools

- Docker
- Kubernetes (kind)
- Git & GitHub
- Bash Scripting
- NGINX (later)
- GitHub Actions (later)

---

## 📁 Project Structure

app/
frontend/
backend/

infra/
docker/
k8s/
terraform/
ansible/

scripts/
docs/

---

## ⚙️ Scripts

### 🔹 Setup Check

./scripts/setup.sh

Checks if required tools are installed (docker, node, kubectl, etc.)

---

### 🔹 View Logs

./scripts/logs.sh <container_name>

Shows live logs from a Docker container

---

## 📌 Status

Day 1 Completed
Project structure created
Git initialized
Setup script added
Logs script added

---

## 🔥 Day 2 — Backend Setup

### ✅ Features Implemented

- Express server setup
- MongoDB connected using Mongoose
- Project structured with MVC pattern:
    - models/
    - routes/
    - controllers/
    - config/
- User model created
- Create User API implemented

### 📡 API Endpoint

#### Create User

POST /api/users

Example request:

```bash
curl -X POST http://localhost:8080/api/users \
-H "Content-Type: application/json" \
-d '{"name":"Anil","email":"anil@example.com","password":"123456"}'
🗄️ Database

MongoDB running via Docker

Database name: food_ordering_devops

▶️ Run Backend
cd app/backend
npm run dev
📌 Status

✅ Day 2 Completed
✔ Backend running
✔ MongoDB connected
✔ API working

## 🔐 Day 3 — Authentication System

- Register API implemented
- Login API implemented
- Password hashing using bcrypt
- JWT authentication implemented

## 👨‍💻 Author

Anil Yadav
```
