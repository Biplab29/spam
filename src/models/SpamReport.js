const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SpamReport = sequelize.define("SpamReport", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "spam_reports",
  indexes: [
    { unique: true, fields: ["phone", "userId"] },
    { fields: ["phone"] }
  ]
});

module.exports = SpamReport;
