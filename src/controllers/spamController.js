const SpamReport = require("../models/SpamReport");
const User = require("../models/User");   
const Contact = require("../models/Contact"); 

exports.report = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone required" });
    }

    await SpamReport.create({ phone, userId: req.user.id });

    const spamCount = await SpamReport.count({ where: { phone } });

    const totalUsers = await User.count();

    const spamPercentage = ((spamCount / totalUsers) * 100).toFixed(2);

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
