// resolvers/userResolvers.js
const bcryptjs = require('bcryptjs');  // Changed from bcrypt to bcryptjs
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userResolvers = {
  Query: {
    login: async (_, { usernameOrEmail, password }) => {
      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      
      if (!user) {
        throw new Error('User not found');
      }

      const isValid = await bcryptjs.compare(password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      };
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user - password will be hashed by the pre-save middleware
      const user = new User({
        username,
        email,
        password
      });

      await user.save();

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      };
    },
  },
};

module.exports = userResolvers;