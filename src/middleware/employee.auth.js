const jwt = require("jsonwebtoken");
const AuthMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(500).json({
      success: false,
      message: "Token is required for Authentication",
    });
  }
   const beararToken = token.split(" ")[1];
    if (!beararToken) {
      return res.status(402).json({
        success: false,
        message: "Token is required",
      });
    }
  try {
    const Decode = jwt.verify(beararToken, process.env.JWT_EMPLOYEE_SECRET_KEY);
    req.employee = Decode;
    console.log(Decode);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  return next();
};
module.exports = AuthMiddleware;
