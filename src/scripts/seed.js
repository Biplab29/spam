// require("dotenv").config();
// const sequelize = require("../config/database");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const Contact = require("../models/Contact");
// const SpamReport = require("../models/SpamReport");

// async function run() {
//   await sequelize.sync({ force: true });

//   const pass = await bcrypt.hash("password123", 10);
//   const alice = await User.create({ name: "Alice", phone: "1111111111", email: "alice@example.com", password: pass });
//   const bob = await User.create({ name: "Bob", phone: "2222222222", email: "bob@example.com", password: pass });
//   const carol = await User.create({ name: "Carol", phone: "3333333333", email: "carol@example.com", password: pass });

//   await Contact.bulkCreate([
//     { name: "Bob B.", phone: "2222222222", userId: alice.id },
//     { name: "Spammy", phone: "9998887777", userId: alice.id },
//     { name: "Unknown X", phone: "1231231234", userId: alice.id }
//   ]);

//   await Contact.bulkCreate([
//     { name: "Alice A.", phone: "1111111111", userId: bob.id },
//     { name: "Telemarketer", phone: "9998887777", userId: bob.id }
//   ]);

//   await SpamReport.bulkCreate([
//     { phone: "9998887777", userId: alice.id },
//     { phone: "9998887777", userId: bob.id },
//     { phone: "1231231234", userId: carol.id }
//   ]);

//   console.log("Seed complete.");
//   process.exit(0);
// }

// run().catch(e => { console.error(e); process.exit(1); });
