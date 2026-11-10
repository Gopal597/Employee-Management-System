const Joi = require("joi");
class EmployeeValidation {
  static sighnup = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

    phone: Joi
      .string()
      .trim()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        "string.pattern.base": "Please provide a valid 10-digit mobile number",
        "string.empty": "Phone number is required",
        "any.required": "Phone number is required",
      }),
    password: Joi.string().trim().min(6).max(15).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 10 characters",
      "any.required": "Password is required",
    }),
  });

  static login = Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

    password: Joi.string().trim().min(6).max(15).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 10 characters",
      "any.required": "Password is required",
    }),
  });
  static resetPassword = Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),
    newPassword: Joi.string().trim().min(6).max(15).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password cannot exceed 10 characters",
      "any.required": "Password is required",
    }),
  });
  static logoutemployee=Joi.object({
     name: Joi.string().trim().required().messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please provide a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required",
    }),

  })
}

module.exports = EmployeeValidation;
