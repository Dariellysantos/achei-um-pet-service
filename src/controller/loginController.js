const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createLogin = async (req, res) => {
  const body = req.body;

  try {
    const user = await UserSchema.find({ email: body.email });

    if (user.length === 0) {
      return res.status(404).json({
        message: "E-mail not found.",
        code: "NOT_FOUND_ERROR",
        data: null,
      });
    }

    const match = await bcrypt.compare(body.password, user[0].password);

    if (match) {
      var token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        message: "Allowed access",
        code: "SUCCESS",
        data: {
          token: token,
        },
      });
    } else {
      return res.status(401).json({
        message: "Incorrect password",
        code: "ERROR_INCORRECT_PASSWORD",
        data: null,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
      data: null,
    });
  }
};

module.exports = {
  createLogin,
};
