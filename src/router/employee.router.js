const express = require("express");
const Route = express.Router();
const Auth = require("../middleware/employee.auth");
const EmployeeController = require("../controller/employee.controller");
Route.post("/register", EmployeeController.EmployeeRegister);
Route.post("/login", EmployeeController.EmployeeLogin);
Route.put(
  "/change-temporary-password",
  EmployeeController.ChangeTemporaryPassword,
);
Route.get("/dashboard", Auth, EmployeeController.DashBoard);
Route.post("/logout", Auth, EmployeeController.EmployeeLogout);
module.exports = Route;
