const { GraphQLString } = require('graphql');
const { UserType, EmployeeType } = require('./type');

// Import Mongoose models
const  User  = require('../models/User');
const  Employee  = require('../models/Employee');

// Import bcrypt for password hashing
const bcrypt = require('bcryptjs');

// Import utility function for creating JWT tokens
const { createToken } = require('../utils/auth');

//Define Login Query
const Login = {
    type : UserType,
    args : {
        email : {type : GraphQLString},
        password : {type : GraphQLString}
    },
    async resolve (parent, args){
        const {email, password} = args;
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
            id: user.id,
            username: user.username,
            email: user.email,
            token
        };
    }
    
}

module.exports = { Login };
