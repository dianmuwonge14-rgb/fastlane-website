const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  pickup: String,
  dropoff: String,
  date: String,
  vehicle: String,
  payment: String,
  transactionId: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);