var express = require("express");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const passport = require("passport");
var fs = require("fs");
const router = express.Router();
const Owner = require("../models/Owner");
const Vehicle = require("../models/Vehicle");
const Employee = require("../models/Employee");
const Service_centre = require("../models/Service_centre");
const sequelize = require("../util/database");
const {forwardAuthenticated, ensureAuthenticated} = require("../middleware/auth");


router.get('/',forwardAuthenticated, (req, res) => {
	res.render('login');
})

router.get('/register',forwardAuthenticated, (req, res) => {
	res.render('register');
})

router.post("/register",forwardAuthenticated, async (req, res) => {
	let { username, password, address, phone_no, email } = req.body;
	const salt = await bcrypt.genSalt(10);
	let hashPassword = await bcrypt.hash(password, salt);
	const owner = await Owner.create({
		username: username,
		password: hashPassword,
		address: address,
		phone_no: phone_no,
		email: email,
	})
	
	// console.log(owner.dataValues.password)
	// const payload = {
    //     user: {
    //       id: owner.dataValues.id,
    //     },
    //   };
	//   loggedInUser = 
	// jwt.sign(payload, "HelloWorld", { expiresIn: 3600000 }, (err, token) => {
	// if (err) throw err;
	// res.json({ token });
	// })
	res.redirect("/");
});

//login
router.post("/login",forwardAuthenticated,  (req, res, next) => {
	passport.authenticate("local", {
		successRedirect: "/addVehicle",
		failureRedirect: "/",
		// failureFlash: true,
	})(req, res, next);
	
});

//Add vehicle
router.get('/addVehicle', ensureAuthenticated, (req, res) => {
	// console.log(req.user)
	res.render('home', { user: req.user })
	// res.send("hello world")
})

// allow user to add vehicle
router.post("/addVehicle", ensureAuthenticated, async (req, res) => {
	let { vehicle_no, model, problem, last_serviced } = req.body;
	// let owner = await Owner.findByPk(7);
	// console.log(req.user.id)
	Vehicle.create({
		vehicle_no,
		model,
		problem,
		last_serviced,
		// serviceCentreId: 10,
		ownerId: req.user.id,
	});
	
	return res.redirect("/getVehicle");
});

//Get all vehicle of logged in user
router.get("/getVehicle",ensureAuthenticated, async (req, res) => {
	// let res1 = await Owner.findAll({ where: { id: 1 } });
	if (req.user.admin) {
		let res1 = await Owner.findAll({
			include: Vehicle,
			order: [[{ model: Vehicle }, "updatedAt", "DESC"]],
			attributes: {
				exclude: ["password"],
			},
		});
		return res.render("bookings", { user: req.user, res1 });
		// res.send(res1);
	} 
	let res1 = await Owner.findAll({
		include: {
			model: Vehicle,
			where: { ownerId: req.user.id },
		},
		order: [[{ model: Vehicle }, "updatedAt", "DESC"]],
		attributes: {
			exclude: ["password"],
		},
	});
	// console.log(res1);
	res.render("bookings", { user: req.user, res1 });
	// res.json(res1);
})


//Get all users along with vehicle for admin view
router.get("/getAllVehicle", ensureAuthenticated, async (req, res) => {
	let checkAdmin = await Owner.findOne({ where: { id: req.user.id } });
	if (checkAdmin.dataValues.admin) {
		let res1 = await Owner.findAll({
			include: Vehicle,
			attributes: {
				exclude: ["password"],
			},
		});
		res.send(res1);
	} else {
		res.send("Access Denied");
	}
});

router.get("/addEmployee", ensureAuthenticated, async (req, res) => { 
	if (req.user.admin) {
		res.render("add_employee", { user: req.user });
	} else {
		res.redirect("/getVehicle");
	}
})

//Create new employee
router.post("/addEmployee", ensureAuthenticated, async (req, res) => {
	let { first_name, last_name, role, salary, joining_date } = req.body;
	let name = first_name + " " + last_name;
	// let owner = await Owner.findByPk(7);
	Employee.create({
		name,
		role,
		salary,
		joining_date,
		// serviceCentreId: 10,
	});
	// return res.json("success");
	return res.redirect("/getAllEmployee");
});

//get details of all employee
router.get("/getAllEmployee", ensureAuthenticated, async (req, res) => {
	// let checkAdmin = await Owner.findOne({ where: { id: req.user.id } });
	if (req.user.admin) {
		let res1 = await Employee.findAll({
			order: [["updatedAt", "DESC"]]
		});
		res.render("view_employee", { user: req.user ,res1});
		// res.send(res1);
	} else {
		res.send("Access Denied");
	}
});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});


module.exports = router;
