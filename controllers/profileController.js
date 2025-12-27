import User from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let bmi = null;
    if (user.height && user.weight) {
      const heightInMeters = user.height / 100;
      bmi = (user.weight / (heightInMeters * heightInMeters)).toFixed(2);
    }

    res.json({
      ...user.toObject(),
      bmi
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
