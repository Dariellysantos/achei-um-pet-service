const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

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

    if (body.password == user[0].password) {
      var token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET_KEY);

      return res.status(200).json({
        message: "Allowed access",
        code: "SUCCESS",
        data: {
          token: token,
        },
      });
    } else {
      res.status(401).json({
        message: "Senha incorreta",
        code: "ERROR_INCORRECT_PASSWORD",
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Erro interno.",
      code: "INTERNAL_SERVER_ERROR",
      data: null,
    });
  }
};

module.exports = {
  createLogin,
};
