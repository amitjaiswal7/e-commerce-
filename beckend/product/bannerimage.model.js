import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
});

export const Image_model = mongoose.model("Image", imageSchema);