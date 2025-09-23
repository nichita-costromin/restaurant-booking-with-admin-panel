const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  token: {
    require: true,
    type: String,
  },
  createdAt: {
    type: Date,
    date: Date.now,
    expires: 3600,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  used: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('PasswordResetToken', passwordResetTokenSchema);