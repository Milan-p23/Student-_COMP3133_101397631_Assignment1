const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = require('graphql');
// const { Employee , User } = require('../models');


const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'User type definition',
    fields: () => ({
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      token: { type: GraphQLString },
      created_at: { type: GraphQLString },
      updated_at: { type: GraphQLString }
    })
  });

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'Employee type definition',
    fields: () => ({
        id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        designation: { type: GraphQLString },
        salary: { type: GraphQLFloat },
        date_of_joining: { type: GraphQLString },
        department: { type: GraphQLString },
        employee_photo: { type: GraphQLString },
        created_at: { type: GraphQLString },
        updated_at: { type: GraphQLString }
    })
});


module.exports = { UserType, EmployeeType };