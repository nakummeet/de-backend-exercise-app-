import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    day: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Ensure one record per user per day
progressSchema.index({ userId: 1, day: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
