require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const sequelize = require("./config/database");

require("./models/User");
require("./models/Contact");
require("./models/SpamReport");

const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const spamRoutes = require("./routes/spamRoutes");
const searchRoutes = require("./routes/searchRoutes");
const protect = require("./middleware/authMiddleware");

const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// expose user to views if token present
app.use(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) { res.locals.user = null; return next(); }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    res.locals.user = user ? { id: user.id, name: user.name, phone: user.phone } : null;
  } catch {
    res.locals.user = null;
  }
  next();
});

// pages
app.get("/", (req, res) => res.render("index"));
app.get("/dashboard", protect, require("./controllers/contactController").list);

// routes
app.use("/", authRoutes);
app.use("/contacts", contactRoutes);
app.use("/spam", spamRoutes);
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}).catch(err => {
  console.error("Sequelize error:", err.message);
});
