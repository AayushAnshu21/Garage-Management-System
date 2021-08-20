const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Vehicle = sequelize.define("vehicle", {
	vehicle_no: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	model: Sequelize.STRING,
	problem: Sequelize.STRING,
	last_serviced: Sequelize.STRING,
	serviced: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Vehicle;
