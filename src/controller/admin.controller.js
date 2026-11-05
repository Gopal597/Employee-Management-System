const Admin = require("../models/admin.model");
const Employee = require("../models/employee.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Admincontroller {
  async AdminRegister(req, res) {
    // console.log(req.body);
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(402).json({
          success: false,
          message: "All fileds are required",
        });
      }
      const emailUser = await Admin.findOne({ email });
      if (emailUser) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists",
        });
      }
      // if (!req.admin || req.admin.role !== "admin") {
      //   return res.status(403).json({
      //     success: false,
      //     message: [
      //       "Unauthorized: Registration is closed. Anybody could not register.",
      //       "Only Register Admin",
      //     ],
      //   });
      // }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const AdminData = new Admin({
        name,
        email,
        password: hashPassword,
      });
      const data = await AdminData.save();
      return res.status(200).json({
        success: true,
        message: "Admin Register Successfully",
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async AdminLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(402).json({
          success: false,
          message: "All fileds are required",
        });
      }
      const admin = await Admin.findOne({ email });
      const matchPass = await bcrypt.compare(password, admin.password);
      if (!matchPass) {
        return res.status(500).json({
          success: false,
          message: "Invalid Password",
        });
      }
      const createToken = jwt.sign(
        {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        process.env.JWT_ADMIN_SECRET_KEY,
        {
          expiresIn: "1d",
        },
      );
      return res.status(200).json({
        succcess: true,
        message: "Admin Login Successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
        createToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async DashBoard(req, res) {
    try {
      return res.status(200).json({
        success: true,
        message: "DashBorad Show Successfully",
        admin: req.admin,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  // async EmployeeRegister(req, res) {
  //   console.log(req.body);
  //   try {
  //     const { name, email, password } = req.body;
  //     if (!name || !email || !password) {
  //       return res.status(402).json({
  //         success: false,
  //         message: "All fileds are required",
  //       });
  //     }
  //     if (!req.admin || req.admin.role !== "admin") {
  //       return res.status(403).json({
  //         success: false,
  //         message: [
  //           "Unauthorized: Registration is closed. Anybody could not register.",
  //           "Only Register Admin",
  //         ],
  //       });
  //     }
  //     const emailUser = await Employee.findOne({ email });
  //     if (emailUser) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Admin already exists",
  //       });
  //     }
  //     const salt = await bcrypt.genSalt(10);
  //     const hashPassword = await bcrypt.hash(password, salt);
  //     const AdminData = new Employee({
  //       name,
  //       email,
  //       password: hashPassword,
  //     });
  //     const data = await AdminData.save();
  //     return res.status(200).json({
  //       success: true,
  //       message: "Admin Register Successfully",
  //       data,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }
  // }
  async CreateEmployee(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(402).json({
          success: false,
          message: "All fileds are required",
        });
      }
      const userexist = await Employee.findOne({ email });
      if (userexist) {
        return res.status(402).json({
          success: false,
          message: "Employee already Exsits",
        });
      }
      const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
      // const tempPass =`${password}${randomDigits}`
      const employeedata = new Employee({
        name,
        email,
        password: randomDigits,
      });
      const employeeinfo = await employeedata.save();
      return res.status(200).json({
        success: true,
        message: "Employee created Successfully",
        employee: {
          id: employeeinfo._id,
          name: employeeinfo.name,
          email: employeeinfo.email,
        },
        TemporaryPass: randomDigits,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async GetallEmployee(req, res) {
    try {
      const getall = await Employee.find();
      console.log(getall);
      return res.status(200).json({
        success: true,
        message: "Getall Employee data Successfully",
        total: getall.length,
        getall,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async DeleteEmployeedata(req, res) {
    try {
      const { email } = req.body;
      const employee = await Employee.findOne({ email });
      const id = req.params.id;
      const deletedata = await Employee.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: `Delete  ${employee.email}  data Successfully`,
        deletedata,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new Admincontroller();
