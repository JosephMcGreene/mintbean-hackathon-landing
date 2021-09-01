const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Player = require("../models/player");
const validatePassword = require("../utils/passwordUtilities").validatePassword;

/**
 *
 * References used here:
 * https://www.youtube.com/watch?v=fGrSmBk9v-4&list=PLYQSCk-qyTW2ewJ05f_GKHtTIzjynDgjK&index=6
 * https://github.com/zachgoll/express-session-authentication-starter/tree/final
 *
 */
const verifyCallback = (username, password, done) => {
  console.log(`Attempting to locate the given user ${username}`);

  Player.findOne({ login: username })
    .then((user) => {
      // user not found in the database.
      if (!user) {
        console.log("User not found");
        return done(null, false, { message: "User Not Found" });
      }

      // we found the user, now verifying the password matches.

      const isValid = validatePassword(password, user);

      if (isValid) {
        return done(null, user);
      } else {
        console.log("password mismatch");

        return done(null, false, { message: "Incorrect Password" });
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  Player.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
