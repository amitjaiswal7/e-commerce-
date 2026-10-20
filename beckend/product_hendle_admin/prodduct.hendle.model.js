import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    category: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const product_upload_model =
  mongoose.models.product ||
  mongoose.model("product", product);

export default product_upload_model;