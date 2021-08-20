const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20");
const LocalStrategy = require("passport-local");
// const keys = require("./keys");
const Owner = require("../models/Owner");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        //Matching User
        const user = await Owner.findOne({ where: { email: email } });
        // console.log(user)
        if (!user) {
            // return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
            return done(null, false, { msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.dataValues.password);
        if (!isMatch) {
            return done(null, false, { msg: "Invalid credentials" });
        }
        return done(null, user.dataValues);
    })
		
);

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Owner.findByPk(id);
        done(null,user.dataValues)
		// console.log(user.dataValues);
    } catch (error) {
        done(null, { message: "User does not exist" });
        // console.error("this is error,", error.message)
        
    }
    

	// User.findById(id)
	// 	.then((user) => {
	// 		done(null, user);
	// 	})
	// 	.catch((err) => {
	// 		console.error(err);
	// 	});
});

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			//options for strategy
// 			callbackURL: "/google/redirect",
// 			clientID: keys.google.clientID,
// 			clientSecret: keys.google.clientSecret,
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			//passport callback
// 			console.log("passport callback fired");
// 			const newUser = new User({
// 				username: profile.displayName,
// 				googleId: profile.id,
// 			});
// 			User.findOne({ googleId: profile.id })
// 				.then((user) => {
// 					if (user) {
// 						//already have user
// 						console.log("user is found");
// 						done(null, user);
// 					} else {
// 						newUser
// 							.save()
// 							.then((user) => {
// 								console.log("new user created" + user);
// 								done(null, user);
// 							})
// 							.catch((err) => {
// 								console.log(err);
// 							});
// 					}
// 				})
// 				.catch((err) => {
// 					console.error(err);
// 				});
// 		}
// 	)
// );
