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

const createUser = async (req, res) => {
  try {
    const newUser = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      postalCode: req.body.postalCode,
      phone: req.body.phone,
      socialMedia: req.body.socialMedia,
    });

    const sevedUser = await newUser.save();

    res.status(200).json({
      message: "nota adastrada com sucesso!",
      sevedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
};
