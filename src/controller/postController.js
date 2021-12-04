const mongoose = require("mongoose");
const PostSchema = require("../models/postsSchema");

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

module.exports = {
  createPost,
};
