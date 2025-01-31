const { GraphQLSchema, GraphQLObjectType } = require('graphql');

//Import queries
const {} = require('./queries');

//Import mutations

const {} = require('./mutations');

// Define the Query type

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'The root query type.',
    fields: {
        // Add queries here
    }
});

const MutationType = new GraphQLObjectType({
    name: 'MutationType',
    description: 'The root mutation type.',
    fields: {
        // Add mutations here
    }
});

module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});
