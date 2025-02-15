# 🚀 Employee Management System (GraphQL + Node.js + MongoDB)

## 📚 **Introduction**
The **Employee Management System** is a **GraphQL-based API** designed for **user authentication and employee management**. It includes:
- ✅ **User authentication** (Signup, Login with JWT)
- ✅ **Employee CRUD operations**
- ✅ **Role-based access control** (Only authenticated users can manage employees)
- ✅ **Data validation** using `express-validator`
- ✅ **MongoDB storage** with `Mongoose`
- ✅ **JWT authentication** for security

---

## 🤝 **Setup & Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Milan-p23/Student-_COMP3133_101397631_Assignment1.git
cd employee-management-system
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```env
MONGO_URI=mongodb+srv://your_db_user:your_db_password@cluster0.mongodb.net/your_db_name
JWT_SECRET=your_secret_key
PORT=4000
```

### **4️⃣ Start the Server**
```sh
npm start
```
✅ Server will start at: **`http://localhost:4000/graphql`**

---

## 🚀 **GraphQL API Endpoints**

### **1️⃣ User Authentication**
#### **🔹 Signup Mutation**
**Endpoint:** `/graphql`
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

#### **🔹 Login Mutation**
```graphql
mutation {
  Login(email: "john@example.com", password: "secure123") {
    id
    username
    email
    token
  }
}
```

---

### **2️⃣ Employee Management**
🔹 **All Employee management queries require authentication!**  
🔹 **Pass JWT Token in the request headers as:**  
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```

#### **🔹 Add Employee Mutation**
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
    employee_photo: "john.jpg"
  ) {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### **🔹 Get All Employees Query**
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

---

## ⚙️ **Project Structure**
```
📂 employee-management-system
│── 📂 src
│   ├── 📂 config                 # Database configuration
│   │   ├── db.js                 # MongoDB connection
│   │
│   ├── 📂 models                 # Mongoose models
│   │   ├── User.js                # User schema
│   │   ├── Employee.js            # Employee schema
│   │
│   ├── 📂 graphql                 # GraphQL API
│   │   ├── 📂 mutations           # GraphQL mutations
│   │   ├── 📂 queries             # GraphQL queries
│   │   ├── 📂 type                # GraphQL types
│   │   ├── schema.js              # Main GraphQL schema
│   │
│   ├── 📂 middleware              # Authentication middleware
│   │   ├── authMiddleware.js
│   │
│   ├── 📂 utils                   # Utility functions
│   │   ├── validateInput.js       # Express validation helper
│   │
│   ├── 📂 validations             # Input validation rules
│   │   ├── userValidations.js     # User validation rules
│   │   ├── employeeValidations.js # Employee validation rules
│   │
│   ├── server.js                  # Express server
│
│── .env                            # Environment variables
│── package.json                    # Dependencies
│── README.md                        # Documentation
```

---

## 🌟 **How to Customize**
### **🔹 Change Database Name**
Update `.env` file:
```env
MONGO_URI=mongodb+srv://your_db_user:your_db_password@cluster0.mongodb.net/your_new_db_name
```
### **🔹 Change JWT Secret**
Update `.env` file:
```env
JWT_SECRET=your_new_secret_key
```
### **🔹 Modify Employee Schema**
Edit `src/models/Employee.js` and add/remove fields.

### **🔹 Change Authentication Middleware**
Edit `src/middleware/authMiddleware.js` to modify role-based access.

---

## ✅ **Key Features**
✔ **GraphQL API with Queries & Mutations**  
✔ **JWT Authentication for Security**  
✔ **MongoDB with Mongoose ORM**  
✔ **Fully Validated Inputs using `express-validator`**  
✔ **Role-based Access Control for Employees**  
✔ **Modular & Scalable Codebase**  

---

## 📌 **Contributing**
Feel free to **fork, improve, and contribute** to this project.  

---

## 📚 **License**
This project is **MIT Licensed**.

---

🎉 **Enjoy building your Employee Management System!** 🚀

