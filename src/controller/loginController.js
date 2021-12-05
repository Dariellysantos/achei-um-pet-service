const UserSchema = require("../models/usersSchema");

const createLogin = async (req, res) => {
  const body = req.body;
  const user = await UserSchema.find({ email: body.email });

  if (body.password == user[0].password) {
    res.status(200).json("ok");
  }
  res.status(401).json("invalid");
};

module.exports = {
  createLogin,
};
