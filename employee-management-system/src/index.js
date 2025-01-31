require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const { createToken } = require('./utils/auth');
const { authenticate } = require('./middleware/authMiddleware');

// Connect to MongoDB 
connectDB();

const app = express();

// // Middleware for authentication
app.use(authenticate);


//  to test the jsonwebtoken creation
app.get('/authtest', (req, res) => {
  res.json(createToken(
    {
      username: 'testuser',
      email: 'test@gmail.com',
    }
  )); 
});


// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true, // Enable GraphiQL for testing
  })
);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});