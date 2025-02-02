const { GraphQLString, GraphQLFloat } = require('graphql');
const { UserType, EmployeeType } = require('./type');

// Import Mongoose models
const  User  = require('../models/User');
const  Employee  = require('../models/Employee');

// Import utility function for creating JWT tokens
const { createToken } = require('../utils/auth');

const { validateSignup } = require('../validations/userValidations');
const { validateEmployee } = require('../validations/employeeValidations');
const { validateInput } = require('../utils/validateInput');



// Define the Signup mutation
const Signup = {
    // Specify the return type of the mutation
    type: UserType,
    
    // Define the arguments required for the mutation
    args: {
        username: {type : GraphQLString},
        email: {type : GraphQLString},
        password: {type : GraphQLString}
    },
    
    // Resolver function for the Signup mutation
    async resolve(parent, args){

        // Validate user input
        await validateInput(validateSignup, args);

        // Destructure the arguments
        const { username, email, password } = args;
        
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        
        // Create a new User instance with the provided data
        const user = new User({
            username,
            email,
            password
        });
        
        // Save the new user to the database
        await user.save();
        
        // Generate token
        const token = createToken(user);
        
        // Return user object with token
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
            created_at: user.created_at,
            updated_at: user.updated_at
        };
    }
}


//Add New employee
const AddEmployee = {
    type: EmployeeType,
    args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString }
    },

    async resolve(parent, args, context) {
        // Check if the user is authenticated
        console.log("Authenticated User:", context.verifiedUser);
        if (!context.verifiedUser) {
            throw new Error('User not authenticated');
        }

        // Validate employee input
        await validateInput(validateEmployee, args);
        
            //check if employee already exists
            const existingEmployee = await Employee.findOne({ email: args.email });
            if (existingEmployee) {
                throw new Error('Employee already exists');
            }

            // Create a new Employee instance with the provided data
            const employee = new Employee(args);

            // Save the new employee to the database
            await employee.save();
            return employee;

    }
}


// Update employee by eid
const UpdateEmployee = {
    type: EmployeeType,
    args: {
        id: { type: GraphQLString },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString }
    },

    async resolve(parent, args, context) {
        // Check if the user is authenticated
        if (!context.verifiedUser) {
            throw new Error('User not authenticated');
        }

        // Find the employee by eid
        const employee = await Employee.findById(args.id);
        if (!employee) {
            throw new Error('Employee not found');
        }

        // Update the employee with the provided data
        Object.keys(args).forEach(key => {
            if (args[key] !== undefined && key !== "id") {
                employee[key] = args[key];
            }
        });

        // Save the updated employee to the database
        await employee.save();
        return employee;
    }
}


//Delete employee by eid
const DeleteEmployee ={
    type: EmployeeType,
    args: {
        id: { type: GraphQLString }
    },
    async resolve(parent, args, context) {
        if(!context.verifiedUser){
            throw new Error('User not authenticated');
        }
        const employee = await Employee.findById(args.id);
        if(!employee){
            throw new Error('Employee not found');
        }
        await employee.deleteOne();
        return employee;
    }
} 






// Export the Signup mutation
module.exports = { Signup, AddEmployee , UpdateEmployee, DeleteEmployee };




  