import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Reference to the user receiving the notification
    },
    title: {
      type: String,
      required: true, // Title of the notification
    },
    message: {
      type: String,
      required: true, // Detailed message
    },
    read: {
      type: Boolean,
      default: false, // Status of the notification (read/unread)
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default mongoose.model("Notification", NotificationSchema);
