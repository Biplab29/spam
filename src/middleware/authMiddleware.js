const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function protect(req, res, next) {
  const token = req.cookies?.token;

  if (!token) return res.redirect("/login");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.redirect("/login");
    
    req.user = user;
    res.locals.user = { id: user.id, name: user.name, phone: user.phone };
    next();
  } catch {
    return res.redirect("/login");
  }
};
