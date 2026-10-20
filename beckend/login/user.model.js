import mongoose from "mongoose";

const user_text = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  role: {
    type: String,
  },  isVerified: {
      type: Boolean,
      default: false,
    }, 
    number :{
      type: String,
    },
    city:{
      type: String,
    },
    address:{
      type: String,
    },
    pincode:{
      type: String,
    },
    image :{
        data : Buffer,
       contentType: String,
    },

  },
  {
    timestamps: true,
  });

const user_model = mongoose.model("user", user_text);

export default user_model;