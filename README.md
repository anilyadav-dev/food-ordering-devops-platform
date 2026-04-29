# Food Ordering DevOps Platform

## 🎬 Live DevOps Demo (End-to-End CI/CD Pipeline)

This project showcases a production-ready DevOps pipeline where code is automatically built, tested, and deployed to Kubernetes using GitHub Actions, AWS ECR, and Jenkins, with monitoring via Prometheus and Grafana.

[![Watch Demo](https://img.youtube.com/vi/TT0XkaqRb-Y/0.jpg)](https://www.youtube.com/watch?v=TT0XkaqRb-Y)

This is a full-stack food ordering application built to practice real-world DevOps skills.

## 🧪 Project Type

## 🚀 Key Highlights

- End-to-end CI/CD pipeline (GitHub Actions → ECR → Jenkins → Kubernetes)
- Kubernetes deployment with health checks and scaling
- Infrastructure as Code using Terraform
- Monitoring with Prometheus & Grafana
- Automated setup using Bash + Ansible

                  User
                   │
                   ▼
                NGINX
                   │
                   ▼
               Frontend
                   │
                   ▼
               Backend
                   │
                   ▼
                MongoDB

                   │
                   ▼
             Prometheus
                   │
                   ▼
               Grafana

                   │
                   ▼
                Jenkins
                   │
                   ▼
              Kubernetes

                   │
                   ▼
         GitHub Actions
                   │
                   ▼
                  ECR

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


## 🔵 Terraform (Day 11)

### ✅ What I Implemented

- Setup Terraform project structure
- Configured AWS provider (us-west-1)
- Managed existing AWS resources using Terraform import:
  - ECR (backend, frontend)
- Created IAM user using Terraform
- Followed complete Terraform workflow:
  - terraform init
  - terraform plan
  - terraform apply

---

### 🧠 Key Learnings

- Infrastructure as Code using Terraform
- Difference between Terraform configuration and state
- How to import existing AWS resources into Terraform
- Handling AWS permission errors (IAM AccessDenied)
- Debugging using AWS CLI (`aws sts get-caller-identity`)

---

### ⚙️ Tech Used

- Terraform
- AWS (ECR, IAM)
- AWS CLI

---

### 🚀 Outcome

Successfully provisioned and managed AWS infrastructure using Terraform with real-world debugging and permission handling.

## ☸️ Kubernetes Deployment (Day 12–15)

This phase focuses on deploying the MERN application into Kubernetes using Minikube with production-like configurations.

---

## 📅 Day 12 — Kubernetes Setup

- Installed Minikube
- Started local Kubernetes cluster
- Learned core concepts:
  - Pods
  - Services

### Commands used:
```bash
minikube start
kubectl get nodes

Output:
✔ Kubernetes cluster running locally

Day 13 — Deploy Backend + Frontend
	•	Created Kubernetes Deployments for:
	•	backend
	•	frontend
	•	Created Services:
	•	backend-service (ClusterIP)
	•	frontend-service (NodePort)
	•	Pulled Docker images from AWS ECR
	•	Configured imagePullSecrets for private registry

Key Concepts:
	•	Deployment manages pods
	•	Service provides stable network access
	•	NodePort exposes frontend externally

Output:

✔ Application running in Kubernetes

Day 14 — Mongo + Config
	•	Added MongoDB Deployment and Service inside cluster
	•	Implemented configuration management:

ConfigMap
	•	Used to store non-sensitive data
	•	Example:
	•	MONGO_URI

Secret
	•	Used to store sensitive data
	•	Example:
	•	JWT_SECRET

Updated backend Deployment:
	•	Removed hardcoded values
	•	Loaded config using:
	•	configMapKeyRef
	•	secretKeyRef

Output:

✔ Full system integrated inside Kubernetes
Day 15 — Health Checks + Resource Management

Health Probes

Liveness Probe
	•	Checks if container is alive
	•	Restarts container if unhealthy

Readiness Probe
	•	Ensures app is ready before receiving traffic
  livenessProbe:
  httpGet:
    path: /api/health
    port: 8080

readinessProbe:
  httpGet:
    path: /api/health
    port: 8080

Resource Limits

Defined CPU and memory limits:

resources:
  requests:
    memory: "128Mi"
    cpu: "250m"
  limits:
    memory: "256Mi"
    cpu: "500m"

  Debugging Performed
	•	Fixed CrashLoopBackOff due to:
	•	incorrect probe port (5000 → 8080)
	•	Adjusted probe timing using:
	•	initialDelaySeconds
	•	Verified rollout using:
kubectl rollout status deployment backend

Output:

✔ Production-like Kubernetes setup with:
	•	Health monitoring
	•	Stable deployments
	•	Resource management

🧪 Verification Commands
kubectl get pods
kubectl get services

Test Backend:
kubectl port-forward service/backend-service 8080:8080
curl http://localhost:8080/api/health

Test Frontend:
kubectl port-forward service/frontend-service 3000:5173

Open in browser:
http://localhost:3000

🧠 Key Learnings
	•	Kubernetes Deployments and Services
	•	ConfigMap vs Secret
	•	Liveness vs Readiness probes
	•	Debugging container startup issues
	•	Rolling updates behavior
	•	Resource limits for production stability

📅 Day 16 — NGINX Ingress Setup
🔍 Overview

Configured NGINX Ingress Controller to expose the application using a single domain with path-based routing.

⚙️ Implementation

Enabled NGINX Ingress in Minikube:

minikube addons enable ingress
Created ingress.yaml to route traffic
Configured routing rules:
/ → Frontend service
/api → Backend service

Updated local DNS mapping:

/etc/hosts → foodapp.local
🌐 Access
http://foodapp.local
✅ Outcome
Single entry point for the application
Clean routing between frontend and backend
Production-like architecture using Ingress
📅 Day 17 — Jenkins CI/CD Pipeline
🔍 Overview

Implemented a CI/CD pipeline using Jenkins to automate deployment of the MERN application to Kubernetes.

⚙️ Setup

Ran Jenkins using Docker:

docker run -d -p 8081:8080 jenkins/jenkins:lts
Installed recommended plugins
Created pipeline job: mern-devops-pipeline
Connected Jenkins to GitHub repository
Configured Kubernetes access inside Jenkins using kubeconfig
🔄 Pipeline Workflow
GitHub → Jenkins → Kubernetes
1. Pull Code
git clone <repo>
2. Deploy to Kubernetes
kubectl apply -f infra/k8s/
3. Restart Deployments
kubectl rollout restart deployment backend
kubectl rollout restart deployment frontend
4. Verify Deployment
kubectl get pods
🔁 Rollback Strategy

Implemented automatic rollback on failure:

kubectl rollout undo deployment backend
kubectl rollout undo deployment frontend
💡 Benefit
Ensures system stability
Prevents downtime during failed deployments
🔗 GitHub Webhook Integration
Configured webhook using ngrok to expose local Jenkins
Enabled auto-trigger on every push event
GitHub Push → Webhook → Jenkins → Deploy to Kubernetes
🚀 Final Outcome
✅ Fully automated CI/CD pipeline
✅ Deployment triggered on every code push
✅ Integrated Jenkins with Kubernetes
✅ Single domain routing using Ingress
✅ Automatic rollback for failure handling
🎯 Summary

This phase completes a production-style DevOps pipeline:

Application deployment using Kubernetes
Traffic routing using NGINX Ingress
CI/CD automation using Jenkins
Event-driven deployment via GitHub Webhooks

## 🔔 GitHub Webhook Auto Trigger for Jenkins

To automate deployment on every code push, I connected **GitHub Webhooks** with **Jenkins**.

### What was configured
- Enabled **GitHub hook trigger for GITScm polling** in Jenkins pipeline
- Exposed local Jenkins using **ngrok**
- Added GitHub webhook:
  ```text
  https://<ngrok-url>/github-webhook/

  🔗 GitHub Actions + Jenkins Integration

Initially, Jenkins was triggered directly by GitHub Webhooks on every push. That caused a timing issue because Jenkins could start deployment before GitHub Actions finished building and pushing the latest images to AWS ECR.

✅ Final Improved Flow
GitHub Push
   ↓
GitHub Actions (Build + Push Docker images to ECR)
   ↓
Trigger Jenkins after success
   ↓
Jenkins deploys updated Kubernetes manifests
🔧 Improvements Made
Added Jenkins credentials to GitHub Secrets
Used GitHub Actions to trigger Jenkins after successful build
Removed dependency on direct webhook timing
Created a cleaner CI/CD flow between build and deployment
🔐 Secrets Used
GitHub Actions Secrets
JENKINS_URL
JENKINS_USER
JENKINS_API_TOKEN

Phase 5 Summary:
Monitoring, alerting, and automation were implemented to simulate real production environments, enabling system observability, proactive issue detection, and automated infrastructure setup.

## 👨‍💻 Author

Anil Yadav
````
