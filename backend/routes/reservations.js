const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Main Program Code

router.post("/", async (req, res) => {
  try {
    const { name, phone, email, date, numberOfPeople, details = "" } = req.body;

    if (!name || !phone || !email || !date || !numberOfPeople) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (numberOfPeople > 6) {
      return res.status(400).json({ error: "Max 6 people per table" });
    }

    // fullDate is already a string in ISO format from frontend, e.g. "2024-07-21T19:00:00"
    const fullDate = new Date(date);

    const reservation = new Reservation({
      name,
      phone,
      email,
      date: fullDate,
      numberOfPeople,
      details,
    });
    await reservation.save();
    res.status(201).json({ message: "Reservation successful", reservation });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
