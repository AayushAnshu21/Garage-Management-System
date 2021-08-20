var express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./middleware/passport-setup");
var apiroutes = require("./routes/api");

const sequelize = require("./util/database");
const Employee = require("./models/Employee");
const Owner = require("./models/Owner");
const Service_centre = require("./models/Service_centre");
const Vehicle = require("./models/Vehicle");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//session
app.use(cookieSession({
    maxAge : 24 *60 *60 *1000,
    keys : ['keys.session.cookieKey']
}));

//initialise
app.use(passport.initialize());
app.use(passport.session());

app.use("/", apiroutes);

Service_centre.hasMany(Employee);
Employee.belongsTo(Service_centre);
Service_centre.hasMany(Vehicle);
Vehicle.belongsTo(Service_centre);
Vehicle.belongsTo(Owner);
Owner.hasMany(Vehicle);

const port = process.env.port || 5000;

// sequelize.sync({force:true})

app.listen(port, () => {
	console.log("connected to port", port);
});
