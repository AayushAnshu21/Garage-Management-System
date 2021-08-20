module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		// res.flash("error_msg", "Please log in to view that resource");
		res.redirect("/");
	},
	forwardAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		res.redirect("/addVehicle");
	},
	// isAuthorised: function (req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		console.log(req.user.role);
	// 		if (req.user.role === "Administrator") next();
	// 		else {
	// 			req.flash(
	// 				"error_msg",
	// 				"only administrators are authorised to that resource"
	// 			);
	// 			res.redirect("/local/redirect");
	// 		}
	// 	} else {
	// 		req.flash(
	// 			"error_msg",
	// 			"only administrators are authorised to that resource"
	// 		);
	// 		res.redirect("/register");
	// 	}
	// },
};
