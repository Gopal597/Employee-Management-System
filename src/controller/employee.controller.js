const Employee = require("../models/employee.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class EmployeeController {
  async EmployeeRegister(req, res) {
    console.log(req.body);
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(402).json({
          success: false,
          message: "All fileds are required",
        });
      }
      if (!req.admin || req.admin.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: [
            "Unauthorized: Registration is closed. Anybody could not register.",
            "Only Register Admin",
          ],
        });
      }
      const emailUser = await Employee.findOne({ email });
      if (emailUser) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const AdminData = new Employee({
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
  async EmployeeLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(400).json({
          success: false,
          message: "Employee email does not exist",
        });
      }

      let isMatch = false;
      if (employee.password.length === 5) {
        isMatch = employee.password === password;
      } else {
        isMatch = await bcrypt.compare(password, employee.password);
      }

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      if (employee.isFirstLogin) {
        return res.status(403).json({
          success: false,
          message:
            "Force Password Change Required: Please update your temporary password to proceed.",
        });
      }

      employee.lastLogin = new Date();
      await employee.save();

      const token = jwt.sign(
        {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
        },
        process.env.JWT_EMPLOYEE_SECRET_KEY,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
        success: true,
        message: "Employee login Successfully",
        Employee: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          LastLoging: employee.lastLogin
            ? employee.lastLogin.toLocaleString()
            : null,
        },
        token,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  async ChangeTemporaryPassword(req, res) {
    try {
      const { email, temporaryPassword, newPassword } = req.body;

      if (!email || !temporaryPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message:
            "All fields are required (email, temporaryPassword, newPassword)",
        });
      }

      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee account not found",
        });
      }
      if (employee.password !== temporaryPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid temporary password",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      employee.password = hashPassword;
      employee.isFirstLogin = false;
      await employee.save();
      return res.status(200).json({
        success: true,
        message:
          "Password changed successfully! You can now login to your dashboard with your new password.",
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
      const employee = await Employee.findById(req.employee.id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee profile not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Dashboard Profile loaded successfully",
        profile: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          role: employee.role,

          accountStatus: employee.isActive === true ? "Active" : "UnActive",

          lastLogin: employee.lastLogin
            ? employee.lastLogin.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour12: true,
              })
            : "Never Logged In",
        },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async EmployeeLogout(req, res) {
    try {
      const employeeName = req.employee.name;
      const employeeEmail = req.employee.email;

      return res.status(200).json({
        success: true,
        message: `Goodbye, ${employeeName}! Logged out successfully.`,
        loggedOutUser: employeeEmail,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new EmployeeController();
