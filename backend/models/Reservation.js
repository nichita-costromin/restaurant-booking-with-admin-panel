// models/Reservation.js
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, required: true }, 
  numberOfPeople: { type: Number, required: true },
  details: { type: String },
  tableNumber: {type: Number}, 
  status: {                  
    type: String,
    enum: ['Booked', 'Seated', 'Completed', 'Cancelled'],
    default: 'Booked'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", reservationSchema);