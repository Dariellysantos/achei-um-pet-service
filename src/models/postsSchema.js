const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  situation: {
    lifeRisk: {
      type: Boolean,
      required: true,
    },
    hurted: {
      type: Boolean,
      required: true,
    },
    identified: {
      type: Boolean,
      required: true,
    },
    losted: {
      type: Boolean,
      required: true,
    },
    pregnant: {
      type: Boolean,
      required: true,
    },
    puppy: {
      type: Boolean,
      required: true,
    },
  },
  alreadySeen: {
    type: Boolean,
    required: true,
  },
  necessity: {
    rescue: {
      type: Boolean,
      required: true,
    },
    transportation: {
      type: Boolean,
      required: true,
    },
    temporaryHome: {
      type: Boolean,
      required: true,
    },
  },
});

module.exports = mongoose.model("post", postSchema);
