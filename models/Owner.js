const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Owner = sequelize.define("owner", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	address: Sequelize.STRING,
	phone_no: Sequelize.STRING,
	email: Sequelize.STRING,
	admin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Owner;
