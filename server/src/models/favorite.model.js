import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const favoriteModel = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true,
    },
    mediaId: {
      type: String,
      required: true,
    },
    mediaTitle: {
      type: String,
      required: true,
    },
    mediaPoster: {
      type: String,
      required: true,
    },
    mediaRate: {
      type: Number,
      required: true,
    },
  },
  modelOptions
);

favoriteModel.method(
  "remove",
  function (callback) {
    return this.model("Favorite").deleteOne({ _id: this._id }, callback);
  },
  { suppressWarning: true }
);

export default mongoose.model("Favorite", favoriteModel);
