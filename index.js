require("dotenv").config();
const express=require("express")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dbconnection = require("./src/config/dbcon");
const AdminRoute = require("./src/router/admin.router");
const EmployeeRouter=require("./src/router/employee.router")
dbconnection();
app.use("/employee",EmployeeRouter)
app.use("/admin", AdminRoute);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
