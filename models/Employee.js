const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Employee = sequelize.define("employee", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	name: Sequelize.STRING,
	role: Sequelize.STRING,
	salary: Sequelize.STRING,
	joining_date: Sequelize.STRING,
});

module.exports = Employee;
