const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.showLogin = (req, res) => res.render("login", { error: null });
exports.showRegister = (req, res) => res.render("register", { error: null });

exports.register = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    if (!name || !phone || !password) {
      return res.render("register", { error: "Name, phone & password required" });
    }
    const exists = await User.findOne({ where: { phone } });
    if (exists) return res.render("register", { error: "Phone already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, email, password: hashed });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
    
  } catch (err) {
    res.render("register", { error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.render("login", { error: "Phone & password required" });

    const user = await User.findOne({ where: { phone } });
    if (!user) return res.render("login", { error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.render("login", { error: "Invalid credentials" });

    const token = generateToken(user.id);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");

  } catch (err) {
    res.render("login", { error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};
