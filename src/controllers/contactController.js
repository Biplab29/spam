// const Contact = require("../models/Contact");

// exports.list = async (req, res) => {

//   const contacts = await Contact.findAll({ where: { userId: req.user.id }, order: [["name", "ASC"]] });
//   res.render("dashboard", { user: req.user, contacts, added: null, error: null });

// };

// exports.add = async (req, res) => {
//   try {
//     const { name, phone } = req.body;

//     if (!name || !phone) {
//       const contacts = await Contact.findAll({ where: { userId: req.user.id } });
//       return res.render("dashboard", { user: req.user, contacts, added: null, error: "Name and phone required" });
//     }

//     await Contact.create({ name, phone, userId: req.user.id });
//     const contacts = await Contact.findAll({ where: { userId: req.user.id } });
//     res.render("dashboard", { user: req.user, contacts, added: "Contact added", error: null });

//   } catch (e) {
//     const contacts = await Contact.findAll({ where: { userId: req.user.id } });
//     res.render("dashboard", { user: req.user, contacts, added: null, error: e.message });
//   }
// };


const Contact = require("../models/Contact");

// 📌 List contacts
exports.list = async (req, res) => {
  const contacts = await Contact.findAll({
    where: { userId: req.user.id },
    order: [["name", "ASC"]],
  });
  res.render("dashboard", { user: req.user, contacts, added: null, error: null });
};

// 📌 Add contact
exports.add = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      const contacts = await Contact.findAll({ where: { userId: req.user.id } });
      return res.render("dashboard", {
        user: req.user,
        contacts,
        added: null,
        error: "Name and phone required",
      });
    }

    await Contact.create({ name, phone, userId: req.user.id });
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: "Contact added", error: null });
    
  } catch (e) {
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: null, error: e.message });
  }
};

// 📌 Update contact
exports.update = async (req, res) => {
  try {
    const { name, phone } = req.body;
    await Contact.update(
      { name, phone },
      { where: { id: req.params.id, userId: req.user.id } }
    );
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: "Contact updated", error: null });
  } catch (e) {
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: null, error: e.message });
  }
};

// 📌 Delete contact (optional but usually useful)
exports.delete = async (req, res) => {
  try {
    await Contact.destroy({ where: { id: req.params.id, userId: req.user.id } });
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: "Contact deleted", error: null });
  } catch (e) {
    const contacts = await Contact.findAll({ where: { userId: req.user.id } });
    res.render("dashboard", { user: req.user, contacts, added: null, error: e.message });
  }
};
