import Notification from "../models/notification.model.js";

// Get all notifications for the current user
export const getAllNotificationsForCurrentUser = async (req, res) => {
  try {
    const { userId } = req.params; // Assuming req.user contains the authenticated user

    const notifications = await Notification.find({ userId });

    if (notifications) {
      res.status(200).json(notifications);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.log("Error in getAllNotificationsForCurrentUser", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  };
};
// Create a new notification for the current user
export const createNotification = async (req, res) => {
  try {
    const newNotification = req.body;

    const notification = await Notification.create(newNotification);

    res.status(201).json(notification);
  } catch (error) {
    console.log("Error in createNotification", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a specific notification for the current user
export const deleteNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findOneAndDelete({
      _id: notificationId,
    });

    if (notification) {
      res.status(200).json({ message: "Notification deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Notification not found or not authorized" });
    }

  } catch (error) {
    console.log("Error in deleteNotification", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete all notifications for the current user
export const deleteAllCurrentUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.deleteMany({ userId });

    res.status(200).json([]);
  }
  catch (error) {
    console.log("Error in deleteAllCurrentUserNotifications", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  };
}

// Mark a specific notification as read for the current user
export const readCurrentNotification = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId },
      { isRead: true },
      { new: true }
    );

    if (notification) {
      res.status(200).json(notification);
    } else {
      res
        .status(404)
        .json({ message: "Notification not found or not authorized" });
    }
  } catch (error) {
    console.log("Error in readCurrentNotification", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
