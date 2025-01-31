// src/resolvers/index.js
const userResolvers = require('./userResolvers');
const employeeResolvers = require('./employeeResolvers');

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...employeeResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...employeeResolvers.Mutation,
  },
};