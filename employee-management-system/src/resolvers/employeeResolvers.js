// resolvers/employeeResolvers.js
const Employee = require('../models/Employee');

const employeeResolvers = {
  Query: {
    getAllEmployees: async (_, __, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }
      return await Employee.find();
    },

    searchEmployeeById: async (_, { eid }, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }
      const employee = await Employee.findById(eid);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    },

    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }
      const query = {};
      if (designation) query.designation = designation;
      if (department) query.department = department;
      return await Employee.find(query);
    },
  },

  Mutation: {
    addEmployee: async (_, args, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }

      // Validate salary
      if (args.salary < 1000) {
        throw new Error('Salary must be at least 1000');
      }

      // Create new employee
      const employee = new Employee({
        ...args,
        created_at: new Date(),
        updated_at: new Date()
      });

      await employee.save();
      return employee;
    },

    updateEmployee: async (_, { eid, ...args }, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }

      if (args.salary && args.salary < 1000) {
        throw new Error('Salary must be at least 1000');
      }

      const employee = await Employee.findByIdAndUpdate(
        eid,
        {
          ...args,
          updated_at: new Date()
        },
        { new: true }
      );

      if (!employee) {
        throw new Error('Employee not found');
      }

      return employee;
    },

    deleteEmployee: async (_, { eid }, context) => {
      if (!context.req.userId) {
        throw new Error('Not authenticated');
      }

      const employee = await Employee.findByIdAndDelete(eid);
      if (!employee) {
        throw new Error('Employee not found');
      }

      return 'Employee deleted successfully';
    },
  },
};

module.exports = employeeResolvers;