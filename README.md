# 🚀 Full Stack Employee Management System (Angular + Node.js + GraphQL + MongoDB)

## 📚 Introduction
The **Employee Management System** is a **Full Stack Web Application** developed as part of **COMP 3133 Assignment 1 & 2** by **Milan Patel (101397631)**.  
It allows users to **Signup, Login, Manage Employee Records (CRUD)** with **JWT Authentication**, Live Image URL preview, Search, and proper validations.

The backend is built using **Node.js, Express, GraphQL, MongoDB** and the frontend is developed in **Angular (Standalone Components)**.  
**Both Frontend & Backend are deployed together on Vercel in a Single Repository.**

---

## 🌐 Live Demo
> ✅ **Production URL:**  
**https://assignment-full-stach.vercel.app/login**

> ✅ **GitHub Repository:**  
**https://github.com/Milan-p23/Student-_COMP3133_101397631_Assignment1**

---

## 🎯 Key Features
- 🔐 User Authentication (Signup & Login with JWT)
- 📧 Login using **Email or Username**
- 👥 Employee CRUD Operations (Add, View, Update, Delete)
- 🔎 Search Employees by Designation or Department
- 🖼️ Add Employee with **Image URL & Live Preview**
- 💵 Salary Validation (Minimum ₹1000)
- 🎨 Angular Frontend Features:
  - Standalone Components & Modular Architecture
  - Reactive Forms with Field Validations
  - Services for API Integration
  - Custom Pipes (e.g., Capitalize Pipe)
  - Custom Directives
  - Search Filter & Routing
  - Token-based Protected Routes
  - Logout Functionality
- 🌍 Deployed on **Vercel CLI** (Both Frontend & Backend in one repo)
- 🔐 Environment Variables stored securely on Vercel

---

## 🤝 Setup & Installation

```bash
# 1️⃣ Clone the Repository
git clone https://github.com/Milan-p23/Student-_COMP3133_101397631_Assignment1.git
cd Student-_COMP3133_101397631_Assignment1

# 2️⃣ Install Dependencies
npm install
cd 101397631_comp3133_assignment2
npm install
cd ../employee-management-system
npm install

# 3️⃣ Configure Environment Variables
# Add the following variables in .env file inside /employee-management-system:
MONGO_URI=mongodb+srv://your_db_user:your_db_password@cluster0.mongodb.net/comp3133_101397631_assignment1
JWT_SECRET=your_jwt_secret
PORT=4000

# 4️⃣ Run Locally (Optional)
# Backend:
cd employee-management-system
npm start

# Frontend:
cd ../101397631_comp3133_assignment2
ng serve

# 5️⃣ Build & Deploy to Vercel
npx vercel
npx vercel --prod
```

---

## ⚙️ Project Structure

```bash
📂 Student-_COMP3133_101397631_Assignment1
├── 📂 101397631_comp3133_assignment2          # Angular Frontend (Assignment 2)
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.*.json
│   └── 📂 src
│       ├── 📂 app
│       │   ├── 📂 auth                       # Signup & Login Components
│       │   ├── 📂 employees                  # Employee CRUD Components
│       │   ├── 📂 services                   # Auth & Employee Services
│       │   ├── 📂 pipes                      # Capitalize Pipe
│       │   ├── 📂 directives                 # Custom Directives
│       │   ├── app.config.ts                 # Apollo Client Config
│       │   └── app.routes.ts                 # Angular Routing
│       ├── index.html
│       ├── main.ts
│       ├── main.server.ts
│       ├── server.ts                         # SSR Server
│       └── styles.scss
│
├── 📂 employee-management-system              # Node.js Backend (Assignment 1)
│   ├── 📂 src
│   │   ├── 📂 config                         # Database Configuration
│   │   │   └── db.js
│   │   ├── 📂 models                         # Mongoose Models
│   │   │   ├── User.js
│   │   │   └── Employee.js
│   │   ├── 📂 graphql                        # GraphQL API
│   │   │   ├── 📂 mutations
│   │   │   ├── 📂 queries
│   │   │   ├── 📂 type
│   │   │   └── schema.js
│   │   ├── 📂 middleware                     # Auth Middleware
│   │   │   └── authMiddleware.js
│   │   ├── 📂 utils                          # Validation Helpers
│   │   │   └── validateInput.js
│   │   ├── 📂 validations                    # Input Validations
│   │   │   ├── userValidations.js
│   │   │   └── employeeValidations.js
│   │   └── server.js                         # Express Server
│   ├── .env
│   └── package.json
├── vercel.json                                # Vercel Deployment Config
└── README.md                                  # Documentation
```

---

## 🚀 API Endpoints (GraphQL)

### 🟢 User Authentication

#### 🔸 Signup Mutation
```graphql
mutation {
  Signup(username: "john_doe", email: "john@example.com", password: "secure123") {
    id
    username
    email
    token
  }
}
```

#### 🔸 Login (Email or Username)
```graphql
query {
  Login(email: "john@example.com", password: "secure123") {
    id
    username
    email
    token
  }
}
```

---

### 🟢 Employee Management (Protected APIs)
> 🔐 Requires JWT Token in headers:
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

#### 🔸 Add Employee
```graphql
mutation {
  AddEmployee(
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    designation: "Developer",
    salary: 5000,
    date_of_joining: "2023-10-01",
    department: "IT",
    employee_photo: "https://example.com/photo.jpg"
  ) {
    id
    first_name
    last_name
    email
    department
  }
}
```

#### 🔸 Get All Employees
```graphql
query {
  getAllemployees {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### 🔸 Search Employee By ID
```graphql
query {
  getEmployeebyID(id: "employee_id_here") {
    id
    first_name
    last_name
    email
    department
  }
}
```

#### 🔸 Search Employee by Department or Designation
```graphql
query {
  SearchEmployee(department: "IT") {
    id
    first_name
    last_name
    email
  }
}
```

#### 🔸 Update Employee
```graphql
mutation {
  updateEmployee(
    eid: "employee_id_here",
    first_name: "Updated Name",
    salary: 8000
  ) {
    id
    first_name
    salary
  }
}
```

#### 🔸 Delete Employee
```graphql
mutation {
  deleteEmployee(eid: "employee_id_here")
}
```

---

## 🔥 Assignment 2 (Frontend - Angular) Highlights
- ✅ **Signup & Login Forms with Reactive Form Validation**
- ✅ **Email or Username login supported**
- ✅ **Add Employee Form with:**
  - Field Validations
  - Salary ≥ 1000 validation
  - Live **Image URL Preview**
- ✅ **Search Bar** for filtering Employees
- ✅ **Custom Pipes** (Capitalize Pipe)
- ✅ **Custom Directives**
- ✅ **Routing & Lazy Loading**
- ✅ **Token-based Protected Routes & Logout**
- ✅ **Angular Material + Bootstrap UI**
- ✅ **Fully deployed on Vercel (Frontend + Backend in one repo)**

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 🙌 Contributing
Feel free to **fork, improve & raise PRs** to contribute to this project.

---

🎉 **COMP 3133 Full Stack Assignment 1 & 2 Completed & Deployed Successfully!**
