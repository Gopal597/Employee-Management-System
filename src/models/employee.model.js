const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
     
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      default: 'employee',
      enum: ['employee', 'admin'], 
      default:"employee"
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, 
  }
);


const employeeModel = mongoose.model('employee', EmployeeSchema);

module.exports = employeeModel;
