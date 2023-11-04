import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const viewModel = new mongoose.Schema(
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

viewModel.method(
  "remove",
  function (callback) {
    return this.model("View").deleteOne({ _id: this._id }, callback);
  },
  { suppressWarning: true }
);

export default mongoose.model("View", viewModel);
