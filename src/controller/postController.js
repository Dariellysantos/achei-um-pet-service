const mongoose = require("mongoose");
const PostSchema = require("../models/postsSchema");
const { post } = require("../routes/postRoutes");
const UserSchema = require("../models/usersSchema");

const createPost = async (req, res) => {
  try {
    const newPost = new PostSchema({
      _id: new mongoose.Types.ObjectId(),
      id_user: req.body.idUser,
      photo: req.body.photo,
      address: {
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

    const sevedPost = await newPost.save();

    res.status(200).json({
      message: "Post registered successfully!",
      sevedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getByUserId = async (req, res) => {
  try {
    const post = req.params.id;
    let found = await PostSchema.find({ id_user: post });
    res.status(200).json(found);
  } catch (error) {
    if (post === undefined)
      res.status(500).json({
        message: error.message,
      });
  }
};

const deletePostById = async (req, res) => {
  try {
    const post = req.params.id;
    let found = await PostSchema.findByIdAndRemove(post);
    res.status(200).json(found);
  } catch (error) {
    if (post === undefined)
      res.status(500).json({
        message: error.message,
      });
  }
};

const getAll = async (req, res) => {
  try {
    const postsDb = await PostSchema.find();

    const postsResponse = postsDb.map((post) => ({
      id: post.id,
      photo: post.photo,
      address: {
        district: post.address.district,
        city: post.address.city,
      },
      necessity: {
        rescue: post.necessity.rescue,
        transportation: post.necessity.transportation,
        temporaryHome: post.necessity.temporaryHome,
      },
    }));

    res.status(200).json(postsResponse);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const postId = req.params.id;
    let found = await PostSchema.findById(postId);

    res.status(200).json(found);
  } catch (error) {
    if (post === undefined)
      res.status(500).json({
        message: error.message,
      });
  }
};

const createUp = async (req, res) => {
  try {
    const postId = req.params.id;

    let oldPost = await PostSchema.findById(postId);

    let newPost = await PostSchema.findByIdAndUpdate(
      { _id: postId },
      { up_quantity: oldPost.up_quantity + 1 },
      { new: true }
    );

    res.status(200).json({
      message: "UP registered successfully - total: " + newPost.up_quantity,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllHelper = async (req, res) => {
  try {
    const post = req.params.id;
    let found = await PostSchema.findById(post);
    let user = await UserSchema.findById(found.id_user);

    res.status(200).json({
      id: found._id,
      owner: {
        userId: user._id,
        userName: user.name,
        userPhone: user.phone,
        userSocialMedia: user.socialMedia,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
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
