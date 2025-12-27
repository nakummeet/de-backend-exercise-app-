import Progress from "../models/Progress.js";

export const markProgress = async (req, res) => {
  try {
    const { day, completed } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user.id, day },
      { completed, date: new Date() },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};

export const getReport = async (req, res) => {
  try {
    const records = await Progress.find({
      userId: req.user.id,
      completed: true
    }).sort({ day: 1 });

    const completedDays = records.map(r => r.day);

    let currentStreak = 0;
    let maxStreak = 0;
    let streak = 0;

    for (let i = 0; i < completedDays.length; i++) {
      if (i === 0 || completedDays[i] === completedDays[i - 1] + 1) {
        streak++;
      } else {
        streak = 1;
      }
      maxStreak = Math.max(maxStreak, streak);
    }

    currentStreak = streak;

    res.json({
      completedDays,
      currentStreak,
      maxStreak
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate report" });
  }
};
