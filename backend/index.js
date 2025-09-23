// Modules Import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// MODELS
const Reservation = require("./models/Reservation");
const Staff = require("./models/Staff");
const passwordResetToken = require("./models/passwordResetToken");
// JWT & BCRYPT
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
// Middleware Import
const rateLimitingMiddleware =
  require("./middleware/rateLimitingMiddleware").default;
const verifyJWT = require("./middleware/verifyJWT");
// Services Imports
const transporter = require("./services/mailer");

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Connect MONGOOSE

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// GET Routes

app.get("/",verifyJWT, async (req, res) => {
  res.send(await Reservation.find());
});

// POST Routes

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Staff.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ error: "No such user exists. Invalid email / password" });
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token, role: user.role, name: user.name });
});

// POST A NEW RESERVATION

app.post("/api/reservations", rateLimitingMiddleware, async (req, res) => {
  try {
    const { name, phone, email, date, numberOfPeople, details = "" } = req.body;

    if (!name || !phone || !email || !date || !numberOfPeople) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (numberOfPeople > 6) {
      return res.status(400).json({ error: "Max 6 people per table" });
    }

    // get the full date
    const fullDate = new Date(date);
    if (isNaN(fullDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    fullDate < new Date()
      ? res.status(400).json({
          error: "You can't make the reservation for earlier than today.",
        })
      : "";

    // Check the full date

    const reservation = new Reservation({
      name,
      phone,
      email,
      date: fullDate,
      numberOfPeople,
      details,
    });
    await reservation.save();
    console.log(reservation);
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// DELETE A RESERVATION

app.delete("/api/reservations/:id", verifyJWT, async (req, res) => {
  try {
    const reservation = req.params.id;

    const deleted = await Reservation.findByIdAndDelete(reservation);
    if (!deleted) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json({ message: "Reservation successfully cancelled." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error when deleting reservation." });
  }
});

app.patch("/api/reservation/:id", verifyJWT, async (req, res) => {
  const reservationId = req.params.id;
  const updates = req.body;
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (err) {
    console.error("Error updating reservation:", error);
    res
      .status(500)
      .json({ error: "Server error when updating the reservation." });
  }
});

app.get("/api/reservations/:reservation_id", verifyJWT, async (req, res) => {
  try {
    const reservationToUpdate = await Reservation.findById(
      req.params.reservation_id
    );
    if (!reservationToUpdate) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(reservationToUpdate);
  } catch (err) {
    console.log("Error finding the reservation to update: ", err);
    res
      .status(500)
      .json({
        error: "Server error when trying to find the reservation to update",
      });
  }
});

app.post("/api/admin/create-staff", verifyJWT, async (req, res) => {
  const { email, name, role } = req.body;
  // Set temporary password, hash  & save user
  const tempPassword = crypto.randomBytes(8).toString("hex");
  const hashedPassword = await bcrypt.hash(tempPassword, 12);
  const staff = await Staff.create({
    email,
    name,
    role,
    passwordHash: hashedPassword,
  });

  // Create password reset token and save
  const resetToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(resetToken, 12);

  await passwordResetToken.create({
    userId: staff._id,
    token: tokenHash,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiry
  });

  // Send reset link by email

  const resetUrl = `http://localhost:5173/reset-password?token=${resetToken}&id=${staff._id}`;
  await transporter.sendMail({
    to: email,
    subject: "Set your password",
    text: `You were registered as staff member. Click this link (expires in 1 hour) to set your password: ${resetUrl}`,
    html: `<a href="${resetUrl}">Set your password</a>`,
  });

  res.json({ message: "Staff user created & email sent." });
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const { token, id, password } = req.body;

    if (!token || !id || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the reset token document for the user
    const resetTokenDoc = await passwordResetToken.findOne({ userId: id });
    if (!resetTokenDoc) {
      return res.status(400).json({ error: "No user / reset token found." });
    }

    // Check token expiry
    if (resetTokenDoc.expiresAt < new Date()) {
      return res.status(400).json({
        error:
          "Password reset token has expired. Please contact your supervisor in order to create a new one.",
      });
    }

    // Verify token hash matches submitted token
    const tokenMatch = await bcrypt.compare(token, resetTokenDoc.token);
    if (!tokenMatch) {
      return res.status(400).json({ error: "Invalid password reset token" });
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(password, 12);

    // Update user's password
    await Staff.findByIdAndUpdate(id, { passwordHash: newPasswordHash });

    // Delete the token
    await resetTokenDoc.deleteOne();

    return res.json({
      message: "Password successfully reset. You can now log in.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return res
      .status(500)
      .json({ error: "Server error during password reset" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
