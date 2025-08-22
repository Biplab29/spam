const { Op } = require("sequelize");
const User = require("../models/User");
const Contact = require("../models/Contact");
const SpamReport = require("../models/SpamReport");

async function spam(phone) {
  const total = await SpamReport.count({ where: { phone } });
  return Math.min(100, total * 10);
}


exports.search = async (req, res) => {
  const { q, type = "name" } = req.query;
  if (!q) return res.json([]);

  if (type === "name") {
    const starts = await Contact.findAll({
      where: { name: { [Op.like]: `${q}%` } },
      attributes: ["name", "phone"],
      limit: 25
    });
    const contains = await Contact.findAll({
      where: { name: { [Op.like]: `%${q}%` } },
      attributes: ["name", "phone"],
      limit: 25
    });
    const combined = [...starts, ...contains.filter(c => !starts.find(s => s.phone === c.phone && s.name === c.name))];
    const results = await Promise.all(combined.map(async r => ({
      name: r.name,
      phone: r.phone,
      spam: await spam(r.phone)
    })));
    return res.json(results);
  } else {
    const user = await User.findOne({ where: { phone: q } });
    if (user) {
      return res.json([{
        name: user.name, phone: user.phone, registered: true, spam: await spam(user.phone)
      }]);
    }
    const contacts = await Contact.findAll({ where: { phone: q }, attributes: ["name", "phone"] });
    const results = await Promise.all(contacts.map(async c => ({
      name: c.name, phone: c.phone, registered: false, spam: await spam(c.phone)
    })));
    return res.json(results);
  }
};
