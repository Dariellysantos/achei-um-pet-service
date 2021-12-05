const mongoose = require("mongoose");
const UserSchema = require("../models/usersSchema");

const getById = async (req, res) => {
  try {
    const user = req.params.id;
    const userDb = await UserSchema.find({ _id: user });

    const userResponse = userDb.map((post) => ({
      name: post.name,
      email: post.email,
      phone: post.phone,
      socialMedia: post.socialMedia,
    }));

    res.status(200).json(userResponse);
  } catch (error) {
    if (userDb === undefined)
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
      message: "User registered successfully!",
      sevedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).send("erro no header");
  }

  const token = authHeader.split(" ")[1];

  try {
    const findUser = await UserSchema.findById(req.params.id);

    if (findUser) {
      findUser.name = req.body.name || findUser.name;
      findUser.email = req.body.email || findUser.email;
      findUser.password = req.body.password || findUser.password;
      findUser.postalCode = req.body.postalCode || findUser.postalCode;
      findUser.phone = req.body.phone || findUser.phone;
      findUser.socialMedia = req.body.socialMedia || findUser.socialMedia;
    }

    const savedUser = await findUser.save();
    res.status(200).json({
      message: " User updated successfully",
      savedUser,
    });
  } catch (error) {}
};

module.exports = {
  getById,
  createUser,
  updateUserById,
};
