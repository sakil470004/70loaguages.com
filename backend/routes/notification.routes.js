import express from 'express';
import {
  getAllNotificationsForCurrentUser,
  deleteNotification,
  deleteAllCurrentUserNotifications,
  readCurrentNotification,
  createNotification
} from '../controllers/notification.controller.js';


const router = express.Router();

// Get all notifications for the current user
router.get('/getAllNotificationForCurrentUser/:userId',  getAllNotificationsForCurrentUser);
// create notification
router.post('/create',  createNotification);

// Delete a specific notification for the current user
router.delete('/delete/:id',  deleteNotification);

// Delete all notifications for the current user
router.delete('/deleteAll/:userId',  deleteAllCurrentUserNotifications);

// Mark a specific notification as read for the current user
router.patch('/read/:id',  readCurrentNotification);

export default router;
