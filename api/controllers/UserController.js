const User = require("../models/user");
const argon2 = require("argon2");
const controllers = {
  register: async (req, res) => {
    // Check if user exists.
    const { email, password } = req.body;
    if (await User.findOne({ email })) {
      res.json({ error: true, message: "Email is already in use." });
      return;
    }

    let argon2Hash;

    try {
      argon2Hash = await argon2.hash(password);
    } catch (err) {
      console.error(err);

      res.json({
        error: true,
        message: "There was an unexpected system error.",
      });
    }

    try {
      const newUser = await User.create({ ...req.body, password: argon2Hash });
      const { ga_email, full_name, mobile, active } = newUser;
      res.json({
        error: false,
        message: "User was created successfully.",
        user: { email, ga_email, full_name, mobile, active },
      });
    } catch (err) {
      console.error(err);
      res.json({
        error: true,
        message: "There was an unexpected error while creating your user.",
        logs: err,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ error: true, message: "No user found." });
      return;
    }
    try {
      const passwordVerified = await argon2.verify(user.password, password);
      if (passwordVerified) {
        res.json({
          error: false,
          message: "Login successful.",
          user: {
            email: user.email,
            full_name: user.full_name,
            ga_email: user.ga_email,
            active: user.active,
            mobile: user.mobile,
            last_declared: user.last_declared,
          },
        });
      } else {
        res.json({ error: true, message: "Password is wrong." });
      }
    } catch (err) {
      console.log(err);
      res.statusCode(500);
      res.json({ error: true, message: "Something went wrong." });
    }
  },

  validateRegisteredUser: async (req, res) => {
    const { email } = req.body;
    if (await User.findOne({ email })) {
      res.json({ exists: true });
      return;
    } else {
      res.json({ exists: false });
    }
  },

  updateUser: async (req, res) => {
    const { email, ga_email, full_name, active, mobile } = req.body;
    User.findOneAndUpdate(
      { email },
      { ga_email, full_name, active, mobile },
      { new: true } // returns the updated document
    )
      .then((updatedUser) => {
        res.json({
          error: false,
          message: "Update was successful.",
          user: {
            ga_email: updatedUser.ga_email,
            full_name: updatedUser.full_name,
            active: updatedUser.active,
            mobile: updatedUser.mobile,
            last_declared: updatedUser.last_declared,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          error: true,
          message: "Something went wrong while trying to update your user.",
        });
      });
  },
};

module.exports = controllers;
