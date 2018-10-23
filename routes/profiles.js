const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../validation/login");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const passport = require("passport");
const keys = require("../config/keys");

// route POST api/profile/register
router.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  const data = "All fields are required";
  if (!email || !name || !password) {
    return res.status(400).json({ data });
  }
  if (password.length <= 5) {
    const data = "Password must be min 6 char";
    return res.status(400).json({
      data
    });
  }
  Profile.findOne({ email: email }).then(user => {
    if (user) {
      const data = "Email already exists";
      return res.status(400).json({
        data
      });
    } else {
      const newUser = new Profile({
        name: name,
        email: email,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// route POST api/profile/login
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  Profile.findOne({ email }).then(profile => {
    if (!profile) {
      const data = "User not found";
      return res.status(404).json({ data });
    }

    bcrypt.compare(password, profile.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: profile.id, name: profile.name };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        const data = "Password incorrect";
        return res.status(400).json({ data });
      }
    });
  });
});

module.exports = router;
