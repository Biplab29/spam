const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: true, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: "users",
  indexes: [{ unique: true, fields: ["phone"] }]
});

module.exports = User;
