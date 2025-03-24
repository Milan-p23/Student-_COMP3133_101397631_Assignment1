const { GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const { UserType, EmployeeType } = require('./type');
const mongoose = require('mongoose');

// Import Mongoose models
const  User  = require('../models/User');
const  Employee  = require('../models/Employee');

// Import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Import utility function for creating JWT tokens
const { createToken } = require('../utils/auth');

const { validateLogin } = require('../validations/userValidations');
const { validateInput } = require('../utils/validateInput');

//Define Login Query
const Login = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent, args, context) { // Add context parameter
    await validateInput(validateLogin, args);

    const { email, password } = args;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User does not exist');
    }

    const isvalid = await bcrypt.compare(password, user.password);

    if (!isvalid) {
      throw new Error('Invalid password');
    }

    const token = createToken(user);

    return {
      id: user._id.toString(), // Convert to string
      username: user.username, // Return actual username, not ID
      email: user.email,
      token
    };
  }
};

//To get all the employees
const getAllemployees = {
    type: new GraphQLList(EmployeeType),
    async resolve (parent, args, context) {

        console.log("Authenticated User:", context.verifiedUser);
        
        if (!context.verifiedUser) {
            throw new Error("User not authenticated");
        }
        return await Employee.find(); 

    }
}


//Search employee by eid
const getEmployeebyID = {
    type: EmployeeType,
    args: {
        id: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        console.log("Authenticated User:", context.verifiedUser);
        
        if (!context.verifiedUser) {
            throw new Error("User not authenticated");
        }
        const { id } = args; 

        return await Employee.findOne({ _id: new mongoose.Types.ObjectId(id) }); // ✅ Convert to ObjectId
    }
}


// Search Employee by designation or department
const SearchEmployee = {
    type: new GraphQLList(EmployeeType),
    args: {
        designation: { type: GraphQLString },
        department: { type: GraphQLString }
    },

    async resolve(parent, args, context) {
        // Check if the user is authenticated
        if (!context.verifiedUser) {
            throw new Error('User not authenticated');
        }

      // Dynamically construct the search query
      const query = {};
      if (args.designation) query.designation = args.designation;
      if (args.department) query.department = args.department;

      // Fetch employees with matching criteria
      const employees = await Employee.find(query);
      return employees;

    }
}



module.exports = { Login , getAllemployees, getEmployeebyID , SearchEmployee};
