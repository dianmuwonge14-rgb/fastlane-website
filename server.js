const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB
mongoose.connect(process.env.MONGO_URI);

// Admin user
const ADMIN = {
  username: "admin",
  password: bcrypt.hashSync("Fastlane123", 8)
};

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username !== ADMIN.username) {
    return res.status(401).json({ message: "Invalid username" });
  }

  const valid = bcrypt.compareSync(password, ADMIN.password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ username }, "SECRET_KEY", { expiresIn: "1h" });

  res.json({ token });
});

// Routes
const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));