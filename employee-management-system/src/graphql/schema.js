const { GraphQLSchema, GraphQLObjectType } = require('graphql');

//Import queries
const { Login, getAllemployees, getEmployeebyID, SearchEmployee } = require('./queries');

//Import mutations

const { Signup, AddEmployee , UpdateEmployee, DeleteEmployee} = require('./mutations');

// Define the Query type

// Import queries (even if they are empty for now)
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
       
        Login,
        getAllemployees,
        getEmployeebyID,
        SearchEmployee
    }
});


const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type.',
    fields: {
       
        Signup,
        AddEmployee,
        UpdateEmployee,
        DeleteEmployee
    }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
