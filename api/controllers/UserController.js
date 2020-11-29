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

    let argon2Hash = await argon2.hash(password);

    //
    const newUser = await User.create({ ...req.body, password: argon2Hash });
    res.json({
      error: false,
      msg: "User create success.",
      user: { email: newUser.email, full_name: newUser.full_name },
    });
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
    const { email, ga_email, full_name, active } = req.body;
    User.findOneAndUpdate(
      { email },
      { ga_email, full_name, active },
      { new: true } // returns the updated document
    )
      .then((updatedUser) => {
        res.json({
          error: false,
          message: "Update was successeful.",
          user: {
            ga_email: updatedUser.ga_email,
            full_name: updatedUser.full_name,
            active: updatedUser.active,
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
