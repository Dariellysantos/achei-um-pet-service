const UserSchema = require("../models/usersSchema");
var jwt = require("jsonwebtoken");

const createLogin = async (req, res) => {
  const body = req.body;
  const user = await UserSchema.find({ email: body.email });

  if (body.password == user[0].password) {
    var token = jwt.sign({ userId: user._id }, "secretKey");

    res.status(200).json(token);
  }
  res.status(401).json("invalid");
};

module.exports = {
  createLogin,
};
