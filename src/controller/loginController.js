const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

const createLogin = async (req, res) => {
  const body = req.body;
  const user = await UserSchema.find({ email: body.email });

  if (user.length === 0) {
    res.status(404).json({
      message: "E-mail não encontrada",
      code: "NOT_FOUND_ERROR",
      data: null,
    });
  }

  if (body.password == user[0].password) {
    var token = jwt.sign({ userId: user[0]._id }, process.env.JWT_SECRET_KEY);

    res.status(200).json(token);
  }
  res.status(401).json({
    message: "E-mail não cadastrado",
    code: "ERROR_UNREGISTERED_EMAIL",
    data: null,
  });
};

module.exports = {
  createLogin,
};
