const express = require("express");
const Route = express.Router();
const Auth = require("../middleware/employee.auth");
const EmployeeController = require("../controller/employee.controller");
const validation = require("../validation/index");
const EmployeeValidation = require("../validation/employee.validation");
Route.post("/register", EmployeeController.EmployeeRegister);
Route.post(
  "/login",
  validation.validate(EmployeeValidation.login),
  EmployeeController.EmployeeLogin,
);
Route.put(
  "/change-temporary-password",
  // validation.validate(EmployeeValidation.resetPassword),
  EmployeeController.ChangeTemporaryPassword,
);
Route.get("/dashboard", Auth, EmployeeController.DashBoard);
Route.post("/logout",validation.validate(EmployeeValidation.logoutemployee), Auth, EmployeeController.EmployeeLogout);
module.exports = Route;
