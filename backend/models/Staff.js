const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const staffSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: String,
    role: {
      type: String,
      enum: ["super-admin", "manager", "waiter"],
      default: "waiter",
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

staffSchema.methods.setPassword = async (password) => {
    this.passwordHash = await bcrypt.hash(password, 12)
}

staffSchema.methods.validatePassword = async (password) => {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('Staff', staffSchema);