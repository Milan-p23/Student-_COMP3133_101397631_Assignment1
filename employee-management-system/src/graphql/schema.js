const { GraphQLSchema, GraphQLObjectType , GraphQLString} = require('graphql');

//Import queries
const { Login } = require('./queries');

//Import mutations

const { Signup, AddEmployee } = require('./mutations');

// Define the Query type

// Import queries (even if they are empty for now)
const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        // Add queries here
        Login
    }
});


const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type.',
    fields: {
        // Add mutations here
        Signup,
        AddEmployee
    }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
