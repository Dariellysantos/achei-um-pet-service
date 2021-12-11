const mongoose = require("mongoose");
const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

const getById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).send("erro no header");
  }
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
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).send("erro no header");
  }

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

    if (newUser.name === "" || newUser.name.length < 6) {
      res.status(400).json({
        message: "Empty or invalid name.",
        code: "ERROR_INVALID_NAME",
      });
    }

    if (
      newUser.email === "" ||
      newUser.email.indexOf("@") < 0 ||
      newUser.email.indexOf(".com") < 0
    ) {
      res.status(400).json({
        message: "Empty or invalid email.",
        code: "ERROR_INVALID_EMAIL",
      });
    }
    const sevedUser = await newUser.save();

    res.status(201).json({
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

    res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const updateUserById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).send("erro no header");
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
        res.status(400).json({
          message: "Empty or invalid name.",
          code: "ERROR_INVALID_NAME",
        });
      }

      if (
        findUser.email === "" ||
        findUser.email.indexOf("@") < 0 ||
        findUser.email.indexOf(".com") < 0
      ) {
        res.status(400).json({
          message: "Empty or invalid email.",
          code: "ERROR_INVALID_EMAIL",
        });
      }

      const savedUser = await findUser.save();
      res.status(200).json({
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
      res.status(500).json({
        message: "Internal error.",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  } else {
    res.status(401).json({
      message: "Usuário não autorizado.",
    });
  }
};

module.exports = {
  getById,
  createUser,
  updateUserById,
};
