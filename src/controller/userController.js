const mongoose = require("mongoose");
const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }
  try {
    const user = req.params.id;
    const userDb = await UserSchema.find({ _id: user });

    if (userDb.length === 0) {
      return res.status(404).json({
        message: "User not found.",
        code: "NOT_FOUND_ERROR",
      });
    }

    const userResponse = userDb.map((post) => ({
      name: post.name,
      email: post.email,
      phone: post.phone,
      socialMedia: post.socialMedia,
    }));

    return res.status(200).json(userResponse);
  } catch (error) {
    if (userDb === undefined)
      return res.status(500).json({
        message: "Internal error.",
        code: "INTERNAL_SERVER_ERROR",
      });
  }
};

const createUser = async (req, res) => {
  try {
    const passwordCrypt = hashPassword(req.body.password);

    const newUser = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: passwordCrypt,
      postalCode: req.body.postalCode,
      phone: req.body.phone,
      socialMedia: req.body.socialMedia,
    });

    if (newUser.name === "" || newUser.name.length < 6) {
      return res.status(400).json({
        message: "Empty or invalid name.",
        code: "ERROR_INVALID_NAME",
      });
    }

    if (
      newUser.email === "" ||
      newUser.email.indexOf("@") < 0 ||
      newUser.email.indexOf(".com") < 0
    ) {
      return res.status(400).json({
        message: "Empty or invalid email.",
        code: "ERROR_INVALID_EMAIL",
      });
    }
    const sevedUser = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully!",
      sevedUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "E-mail already registered.",
        code: "ERROR_EMAIL_USED",
      });
    }
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const updateUserById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const userIdParam = req.params.id;

  if (userIdParam === decoded.userId) {
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

      if (findUser.name === "" || findUser.name.length < 6) {
        return res.status(400).json({
          message: "Empty or invalid name.",
          code: "ERROR_INVALID_NAME",
        });
      }

      if (
        findUser.email === "" ||
        findUser.email.indexOf("@") < 0 ||
        findUser.email.indexOf(".com") < 0
      ) {
        return res.status(400).json({
          message: "Empty or invalid email.",
          code: "ERROR_INVALID_EMAIL",
        });
      }

      const savedUser = await findUser.save();
      return res.status(200).json({
        message: " User updated successfully",
        savedUser,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(409).json({
          message: "E-mail already registered.",
          code: "ERROR_EMAIL_USED",
        });
      }

      console.log(err);
      return res.status(500).json({
        message: "Internal error.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  } else {
    return res.status(401).json({
      message: "not authorized",
      code: "NOT_AUTHORIZED",
    });
  }
};

const hashPassword = (password) => {
  return bcrypt.hashSync(password, parseInt(process.env.BCRIPT_SALTS));
};

module.exports = {
  getById,
  createUser,
  updateUserById,
};
