const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");

// Verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token" });

  try {
    jwt.verify(token, "SECRET_KEY");
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Create booking
router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json({ message: "Booking successful!" });
});

// Get bookings (protected)
router.get("/", verifyToken, async (req, res) => {
  const bookings = await Booking.find().sort({ _id: -1 });
  res.json(bookings);
});

// Update status
router.put("/:id", async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  res.json({ message: "Updated" });
});

module.exports = router;