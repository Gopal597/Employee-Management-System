const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);
const ModelSchema = mongoose.model("admin", adminSchema);
module.exports = ModelSchema;
