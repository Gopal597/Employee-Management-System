const mongoose = require("mongoose");
const Otpschema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});
const OtpModel = mongoose.model("otp", Otpschema);
module.exports = OtpModel;
