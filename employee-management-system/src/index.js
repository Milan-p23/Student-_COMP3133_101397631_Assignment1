require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Add CORS middleware
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db');
const schema = require('./graphql/schema');
const { authenticate } = require('./middleware/authMiddleware');

connectDB();

const app = express();

// Enable CORS to allow GraphQL Playground to fetch data
app.use(cors());

//  GraphQL Middleware with Authentication
app.use(
  '/graphql',
  (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    let verifiedUser = null;
    if (token) {
      try {
        verifiedUser = authenticate(token); //  Verify JWT token
        console.log("Verification successful:", verifiedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    }

    req.verifiedUser = verifiedUser; //  Store user info in request object
    next();
  },

  graphqlHTTP((req) => ({
    schema: schema,
    graphiql: true, 
    context: { verifiedUser: req.verifiedUser } // Pass verified user to resolvers
  }))
);

//  Route to Generate a Token for Testing
app.get('/authtest', (req, res) => {
  res.json({
    token: createToken({
      username: 'testuser',
      email: 'test@gmail.com',
    })
  });
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
