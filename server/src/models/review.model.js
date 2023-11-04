import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const reviewModel = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
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
  },
  modelOptions
);

reviewModel.method(
  "remove",
  function (callback) {
    return this.model("Review").deleteOne({ _id: this._id }, callback);
  },
  { suppressWarning: true }
);

export default mongoose.model("Review", reviewModel);
