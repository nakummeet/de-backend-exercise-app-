import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    height: Number,       
    weight: Number,        
    challengeDays: {
      type: Number,
      default: 30
    },
    profileImage: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
