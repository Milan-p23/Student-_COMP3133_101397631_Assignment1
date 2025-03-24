require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Add this for file checks
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { GraphQLSchema } = require('graphql');
const connectDB = require('./config/db');
const { authenticate, createToken } = require('./middleware/authMiddleware');

// Import your schema
const schema = require('./graphql/schema');

// Connect to database
connectDB();

const app = express();

// Calculate correct static file path FIRST
const staticPath = path.resolve(
  __dirname,
  process.env.VERCEL 
    ? '../../101397631_comp3133_assignment2/dist/101397631_comp3133_assignment2/browser/browser'
    : '../../../101397631_comp3133_assignment2/dist/101397631_comp3133_assignment2/browser/browser'
);

// Verify static files exist
if (!fs.existsSync(staticPath)) {
  console.error('Static files not found at:', staticPath);
  try {
    console.log('Directory contents:', fs.readdirSync(path.dirname(staticPath)));
  } catch (e) {
    console.error('Could not read directory:', e.message);
  }
  process.exit(1);
}

// Initialize Apollo Server
const apolloServer = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV !== 'production'
});

// Middleware Setup
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(staticPath, {
  maxAge: process.env.VERCEL ? '1y' : '0',
  setHeaders: (res, filePath) => {
    if (filePath.includes('index.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Authentication middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    req.verifiedUser = token ? authenticate(token) : null;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    next();
  }
};

// Start Apollo Server and apply middleware
async function startServer() {
  await apolloServer.start();
  
  // GraphQL Endpoint
  app.use(
    '/graphql',
    authMiddleware,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        verifiedUser: req.verifiedUser
      })
    })
  );

  // Test Endpoint
  app.get('/authtest', (req, res) => {
    res.json({
      token: createToken({
        username: 'testuser',
        email: 'test@gmail.com'
      })
    });
  });

  // Health Check
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString()
    });
  });

  // All other routes to Angular
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });

  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV !== 'production' ? err.message : undefined
    });
  });

  // Start Server
  const PORT = process.env.PORT || 4000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`Static files served from: ${staticPath}`);
  });

  // Handle shutdown gracefully
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

startServer();

// Export for Vercel
module.exports = app;