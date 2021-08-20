const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("service_centre", "root", "1234", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
