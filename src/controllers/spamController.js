const SpamReport = require("../models/SpamReport");
const User = require("../models/User");   
const Contact = require("../models/Contact"); // optional, if you store spamScore in contacts

exports.report = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone required" });
    }

    // Create spam report
    await SpamReport.create({ phone, userId: req.user.id });

    // Count how many unique reports this phone has
    const spamCount = await SpamReport.count({ where: { phone } });

    // Count total registered users (to calculate percentage)
    const totalUsers = await User.count();

    // Calculate spam percentage
    const spamPercentage = ((spamCount / totalUsers) * 100).toFixed(2);

    // (Optional) update spam score in Contact table
    await Contact.update(
      { spamScore: spamPercentage },
      { where: { phone } }
    );

    return res.json({
      message: "Marked as spam",
      spamPercentage
    });

  } catch (e) {
    if (e.message.includes("unique") || e.message.includes("Unique")) {
      return res.status(409).json({ message: "Already reported" });
    }
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
};
