const mongoose = require("mongoose");
const PostSchema = require("../models/postsSchema");
const UserSchema = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

const createPost = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  try {
    const newPost = new PostSchema({
      _id: new mongoose.Types.ObjectId(),
      id_user: decoded.userId,
      photo: req.body.photo,
      address: {
        postalCode: req.body.address.postalCode,
        street: req.body.address.street,
        number: req.body.address.number,
        district: req.body.address.district,
        city: req.body.address.city,
      },
      description: req.body.description,
      situation: {
        lifeRisk: req.body.situation.lifeRisk,
        hurted: req.body.situation.hurted,
        identified: req.body.situation.identified,
        losted: req.body.situation.losted,
        pregnant: req.body.situation.pregnant,
        puppy: req.body.situation.puppy,
      },
      alreadySeen: req.body.alreadySeen,
      necessity: {
        rescue: req.body.necessity.rescue,
        transportation: req.body.necessity.transportation,
        temporaryHome: req.body.necessity.temporaryHome,
      },
    });

    if (newPost.photo === "") {
      return res.status(400).json({
        message: "Post has no image.",
        code: "ERROR_NO_PHOTO",
      });
    }
    const code = newPost.address.postalCode.toString().length;
    if (newPost.address.postalCode === " " || code !== 8) {
      return res.status(400).json({
        message: "Incomplete or empty postal code",
        code: "ERROR_POSTAL_CODE",
      });
    }
    if (
      newPost.address.street === "" ||
      newPost.address.number === 0 ||
      newPost.address.district === "" ||
      newPost.address.city === ""
    ) {
      return res.status(400).json({
        message: "Incomplete or empty address fields.",
        code: "ERROR_REQUIRED_FIELD_ADDRESS",
      });
    }

    const savedPost = await newPost.save();
    return res.status(200).json({
      message: "Post registered successfully!",
      code: "SUCCESS",
      data: savedPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getByUserId = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }
  try {
    const post = req.params.id;
    let found = await PostSchema.find({ id_user: post });

    if (found.length === 0) {
      return res.status(404).json({
        message: "User not found.",
        code: "NOT_FOUND_ERROR",
      });
    }

    return res.status(200).json({
      message: "Post seved successfully!",
      code: "SUCCESS",
      data: found,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const deletePostById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  try {
    const post = req.params.id;
    let postFound = await PostSchema.findById(post);

    if (postFound === null) {
      return res.status(404).json({
        message: "Post not found.",
        code: "NOT_FOUND_ERROR",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.userId !== postFound.id_user.valueOf()) {
      return res.status(401).json({
        message: "Unauthorized user.",
        code: "USER_UNAUTHORIZED",
      });
    }
    let found = await PostSchema.findByIdAndRemove(post);

    if (found === null) {
      return res.status(404).json({
        message: "post not found.",
        code: "NOT_FOUND_ERROR",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully!",
      code: "SUCCESS",
      data: decoded,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const getAll = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  try {
    const { postalCodeFilter } = req.query;
    let postalCodeUser;

    const postsDb = await PostSchema.find();

    let postsResponse;

    if (postalCodeFilter) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      const idUser = decoded.userId.valueOf();
      let dataUser = await UserSchema.findById(idUser);

      postalCodeUser = dataUser.postalCode
        .toString()
        .substr(0, postalCodeFilter);

      postsDb = await PostSchema.find();

      postsResponse = postsDb.filter((p) => {
        return (
          p.address.postalCode.toString().substr(0, postalCodeFilter) ===
          postalCodeUser
        );
      });

      return res.status(200).json({
        message: "User with access to the feed.",
        code: "SUCCESS",
        data: postsResponse,
      });
    }

    postsResponse = postsDb.map((post) => ({
      photo: post.photo,
      address: {
        postalCode: post.address.postalCode,
        district: post.address.district,
        city: post.address.city,
      },
      necessity: {
        rescue: post.necessity.rescue,
        transportation: post.necessity.transportation,
        temporaryHome: post.necessity.temporaryHome,
      },
    }));

    return res.status(200).json({
      message: "User with access to the feed.",
      code: "SUCCESS",
      data: postsResponse,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const getById = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }
  try {
    const postId = req.params.id;
    let found = await PostSchema.findById(postId);

    return res.status(200).json({
      message: "Posts successfully loaded.",
      code: "SUCCESS",
      data: found,
    });
  } catch (err) {
    if (err.massageFormat === undefined) {
      return res.status(409).json({
        message: "Post not found.",
        code: "NOT_FOUND_ERROR",
      });
    }
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const createUp = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  try {
    const postId = req.params.id;
    let oldPost = await PostSchema.findById(postId);

    if (oldPost === null) {
      return res.status(404).json({
        message: "Post not found.",
        code: "NOT_FOUND_ERROR",
      });
    }

    let newPost = await PostSchema.findByIdAndUpdate(
      { _id: postId },
      { up_quantity: oldPost.up_quantity + 1 },
      { new: true }
    );

    return res.status(200).json({
      message: "UP successfully loaded.",
      code: "SUCCESS",
      data: "UP registered successfully - total: " + newPost.up_quantity,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

const getAllHelper = async (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "It did not receive a token jwt",
      code: "NOT_AUTHORIZED_WITHOUT_TOKEN",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const post = req.params.id;
    let found = await PostSchema.findById(post);

    if (found === null) {
      return res.status(404).json({
        message: "Post not found.",
        code: "NOT_FOUND_ERROR",
      });
    }

    let user = await UserSchema.findById(found.id_user);

    if (!user.authorization.permission) {
      return res.status(401).json({
        message: "Post author data is not authorized for sharing",
        code: "UNAUTHOZIZED_ DATA_SHARING",
      });
    }

    return res.status(200).json({
      message: "Contact details loaded successfully.",
      code: "SUCCESS",
      data: {
        id: found._id,
        owner: {
          userId: user._id,
          userName: user.name,
          userPhone: user.phone,
          userSocialMedia: user.socialMedia,
        },
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal error.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

module.exports = {
  createPost,
  getByUserId,
  deletePostById,
  getAll,
  getById,
  createUp,
  getAllHelper,
};
