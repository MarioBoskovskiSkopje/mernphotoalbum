const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Profile = mongoose.model("profile");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Profile.findById(jwt_payload.id)
        .then(profile => {
          if (profile) {
            return done(null, profile);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};