import mongoose from "mongoose";
const URLSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
});

const model = mongoose.model("url", URLSchema);

export default model;
