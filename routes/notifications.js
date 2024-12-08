import express from "express";
import Notification from "../models/Notification.js";

const router = express.Router();

// @desc Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Create a new notification
router.post("/", async (req, res) => {
  const { userId, title, message } = req.body;

  try {
    const notification = new Notification({
      userId,
      title,
      message,
    });

    const createdNotification = await notification.save();
    res.status(201).json(createdNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get all notifications for a user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Mark a notification as read
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true;

    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Delete a notification
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
