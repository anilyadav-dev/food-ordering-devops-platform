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

````bash
curl -X POST http://localhost:8080/api/users \
-H "Content-Type: application/json" \
-d '{"name":"testing","email":"testing@example.com","password":"123456"}'
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

## 🍽️ Day 4 — Core Backend (Menu, Cart, Order)

### ✅ Features Implemented

#### 🥗 Menu APIs (CRUD)
- Create menu item → `POST /api/menu`
- Get all menu items → `GET /api/menu`
- Update menu item → `PUT /api/menu/:id`
- Delete menu item → `DELETE /api/menu/:id`

#### 🛒 Cart APIs
- Add item to cart → `POST /api/cart`
- Get user cart → `GET /api/cart/:userId`
- Supports quantity update
- Uses MongoDB references
- Populates menu item details

#### 📦 Order APIs
- Place order → `POST /api/orders`
- Get user orders → `GET /api/orders/:userId`
- Converts cart → order
- Calculates total price automatically
- Clears cart after order

---

### 🧠 Backend Architecture

- MVC pattern (models, routes, controllers)
- MongoDB relationships:
  - User → Cart → Menu
  - User → Order → Menu
- Data population using `.populate()`
- Clean API structure

---

### 🔐 Environment Variables

Environment variables are used for secure configuration:


PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/food_ordering_devops
JWT_SECRET=your_secret_key


- Config loaded using `dotenv`
- No hardcoded secrets in code

---

### 📌 Status

✅ Day 4 Completed
✔ Menu CRUD APIs working
✔ Cart functionality working
✔ Order system working
✔ Full backend ready
✔ Environment variables configured

---

## 🎨 Day 5 — Frontend Setup

### ✅ Features Implemented

#### ⚛️ React Frontend
- Frontend created using **Vite + React**
- Clean project structure
- Global styling with CSS

#### 🔀 Routing
- Home page → `/`
- Login page → `/login`
- Register page → `/register`

#### 🔐 Auth UI
- Register form UI
- Login form UI
- Styled auth pages
- Logout button added

#### 🔌 Frontend ↔ Backend Integration
- Connected Register API using **axios**
- Connected Login API using **axios**
- Stored logged-in user in `localStorage`
- Displayed login state on home page

#### 🌐 API Communication
- Backend CORS enabled
- Frontend successfully talks to backend on localhost

### ✅ Prettier (Code Formatting)
- Configured Prettier for consistent code style
- Automatically formats code across frontend and backend
- Improves readability and team collaboration

### 🐶 Husky (Git Hooks)
- Husky installed for Git hooks
- Pre-commit hook configured
- Runs formatting checks before every commit

### 🎯 Benefits
- Prevents bad code formatting
- Ensures clean and consistent commits
- Improves code quality automatically


### 📌 Status

✅ Day 5 Completed
✔ React app created
✔ Routing working
✔ Login/Register UI working
✔ Auth API connected
✔ Frontend and backend integrated
✔ Code Quality

## 🚀 Day 6 — Frontend Features (Redux + Full App Flow)

### ✅ Features Implemented

#### 🔐 Authentication Flow
- Login / Register / Logout functionality
- Global auth state using Redux Toolkit
- Protected routes:
  - Unauthenticated users → only Home, Login, Register
  - Authenticated users → access Menu, Cart, Order History

---

#### 🍽️ Menu Page
- Fetch menu items from backend API
- Display items in responsive card layout
- Add items to cart using Redux

---

#### 🛒 Cart Page (Enhanced)
- Fully functional cart using Redux
- Features:
  - Increase item quantity
  - Decrease item quantity
  - Remove items
  - Clear cart
  - Display total price
- Real-time cart updates across app
- Cart count displayed in navbar

---

#### 📦 Order Workflow (Updated UX)
- Flow:
  Menu → Cart → Place Order → Order History

- When placing order:
  - Cart items synced to backend
  - Order created via API
  - Redux cart cleared after success
  - Success message displayed

---

#### 📜 Order History Page
- Displays previously placed orders
- Connected to backend API

---

#### 🛡️ Protected Routing
- Implemented `ProtectedRoute` component
- Redirects unauthorized users to login page

---

#### 🧑‍💻 Admin Dashboard (UI)
- Admin page created with:
  - Add Menu (UI)
  - Edit Menu (UI ready)
  - Delete Menu (UI ready)
- Displays:
  - Logged-in user info
  - Cart summary
  - Backend feature status

> Note: Admin backend role protection (isAdmin) can be added in future enhancement

---

#### 🎨 UI & UX Improvements
- Fully responsive layout
- Modern card-based UI
- Navbar with dynamic state:
  - Cart count
  - Auth-based navigation
- Clean spacing, typography, and button styles

---

### 🧠 Key Concepts Learned

- Redux Toolkit (Slices, Store, Global State)
- State synchronization between frontend and backend
- Protected routes in React
- Full-stack data flow (Menu → Cart → Order → History)
- Component-based architecture
- Real-world cart management logic
- UX improvement by simplifying order flow

---

### 📌 Final App Flow

#### Public Users:
- Home
- Login
- Register

#### Logged-in Users:
- Home
- Menu
- Cart (with full functionality)
- Order History
- Logout

#### Admin (UI):
- Admin Dashboard
- Menu Management (Add / Edit / Delete)

---

🐳 Day 7 — Dockerize Backend and Frontend

✅ Features Implemented

🟢 Backend Dockerization
Created Dockerfile for backend
Used lightweight Node.js image (node:20-alpine)
Installed dependencies inside container
Configured backend to run using npm start
Exposed backend on port 8080

🔵 Frontend Dockerization
Created Dockerfile for frontend (Vite + React)
Installed dependencies inside container
Built production-ready app using npm run build
Served app using vite preview
Fixed container networking issues:
Added --host to expose app outside container
Set port using --port 5173

🧪 Container Testing
Built backend Docker image
Built frontend Docker image
Ran backend container successfully
Ran frontend container successfully
Fixed issues:
Port mismatch (5173 vs 4173)
Vite not accessible from browser
Dependency conflict using --legacy-peer-deps

🧠 Key Concepts Learned
Difference between localhost inside container vs host machine
Docker build vs Docker run
Port mapping (host:container)
Why frontend apps require --host inside containers
Debugging Docker build and runtime issues
📌 Status

✅ Day 7 Completed
✔ Backend containerized
✔ Frontend containerized
✔ Docker images created
✔ Containers running successfully

🐳 Day 8 — Docker Compose (Multi-Container Setup)

✅ Features Implemented

⚙️ Docker Compose Setup
Created docker-compose.yml
Defined services:
mongo
backend
frontend

🗄️ MongoDB Integration
Used official MongoDB image (mongo:7)
Configured persistent storage using volume:
mongo_data:/data/db

🔗 Service Communication
Connected backend to MongoDB using service name:
mongodb://mongo:27017/food_ordering_devops
Replaced localhost with mongo for container communication

⚙️ Backend Configuration
Used build: instead of image: for development
Passed environment variables using Docker Compose
Verified MongoDB connection inside container

🎨 Frontend Integration
Added frontend service to Docker Compose
Built frontend using Docker Compose
Exposed frontend on port 5173
Verified frontend communicates with backend APIs

🧪 Full System Execution
Ran full application using:
docker compose up --build
Verified:
MongoDB container running
Backend container running
Frontend container running
Full application working in browser

🧠 Key Concepts Learned
Docker Compose basics
Running multiple containers together
Service-to-service communication using service names
Environment variable override in containers
Difference between build and image
YAML formatting and indentation rules
Container naming vs project naming

📌 Status

✅ Day 8 Completed
✔ MongoDB container running
✔ Backend connected to MongoDB
✔ Frontend integrated with backend
✔ Full system running using Docker Compose

## ⚙️ Day 9 — GitHub Actions (CI) + NGINX

### ✅ Features Implemented

#### 🌐 NGINX Reverse Proxy
- Created `nginx/default.conf`
- Configured NGINX routing:
  - `/` → frontend
  - `/api` → backend
- Added NGINX service in `docker-compose.yml`
- Verified frontend is accessible through:
  - `http://localhost`
- Verified backend API is accessible through:
  - `http://localhost/api/menu`

---

#### 🤖 GitHub Actions CI Pipeline
- Created workflow file:
  - `.github/workflows/ci.yml`
- Added CI steps for:
  - Checkout code
  - Setup Node.js
  - Install backend dependencies
  - Run backend format check
  - Install frontend dependencies
  - Run frontend lint
  - Run frontend format check
  - Build backend Docker image
  - Build frontend Docker image

---

#### 🛠️ CI Debugging and Fixes
- Fixed frontend dependency installation issue using:
  - `npm install --legacy-peer-deps`
- Fixed frontend lint errors caused by unused variables
- Verified pipeline passes successfully on GitHub Actions

---

### 🧠 Key Concepts Learned

- Reverse proxy setup using NGINX
- Single entry point architecture for frontend and backend
- CI pipeline creation using GitHub Actions
- Automated dependency install, lint, formatting, and Docker build checks
- Debugging real CI failures and fixing them step by step

---

### 📌 Status

✅ Day 9 Completed
✔ NGINX routing working
✔ Frontend accessible through `http://localhost`
✔ Backend API accessible through NGINX
✔ GitHub Actions CI working
✔ Docker image build checks passing

## 🚀 Day 10 — AWS ECR Integration (Docker Image Push)

### 📌 Goal
Integrate AWS ECR with CI pipeline and push Docker images to cloud registry.

---

### 🛠 What I implemented

- Created **AWS ECR repositories**
  - backend
  - frontend

- Configured **IAM user with ECR access**
  - Policy: `AmazonEC2ContainerRegistryFullAccess`

- Added **GitHub Secrets**
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_ACCOUNT_ID`

- Updated **GitHub Actions CI pipeline**
  - Configure AWS credentials
  - Login to Amazon ECR
  - Build Docker images
  - Tag images with ECR URI
  - Push images to ECR

---

### ⚙️ CI/CD Flow

```text
Code Push → GitHub Actions → Docker Build → Tag → Push to AWS ECR


⸻

🐳 Docker Images in AWS

Service 	 Repository	  Tag
Backend	    ECR	         latest
Frontend	  ECR	       latest

🔑 Key Concepts Learned
	•	CI/CD pipeline with GitHub Actions
	•	AWS IAM (secure access control)
	•	Docker image tagging & pushing
	•	Amazon ECR (container registry)
	•	Cloud-based image storage

⸻

📦 Output

✔ Backend Docker image pushed to AWS ECR
✔ Frontend Docker image pushed to AWS ECR
✔ Fully automated pipeline (build + push)

⸻

🧠 Real-world Use

This setup allows:
	•	Centralized image storage
	•	Easy deployment to ECS / Kubernetes
	•	Scalable cloud deployments


## 👨‍💻 Author

Anil Yadav
````
