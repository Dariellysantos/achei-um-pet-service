const mongoose = require("mongoose");
const UserSchema = require("../models/userSchema");

const getAll = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const user = req.params.id;
    let found = await UserSchema.findById(user);

    res.status(200).json(found);
  } catch (error) {
    if (user === undefined)
      res.status(500).json({
        message: error.message,
      });
  }
};

module.exports = {
  getAll,
  getById,
};
