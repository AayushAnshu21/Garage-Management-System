const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Service_centre = sequelize.define(
	"service_centre",
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		address: Sequelize.STRING,
		Name: Sequelize.STRING,
		Slots: Sequelize.INTEGER,
		City: Sequelize.STRING,
		Code: Sequelize.STRING,
		
	},
	{
		hooks: {
			beforeCreate() {
				City: "Bangalore ";
				Code:"101"
			},
		},
	}
);

module.exports = Service_centre;