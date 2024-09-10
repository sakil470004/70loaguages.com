import { useState, useEffect } from "react";
import { FaBell, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";
import moment from "moment"; // For time formatting
import APP_URL from "../../../../APP_URL";
import { useAuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Notification = ({ notification, handleDelete, handleRead }) => {
  return (
    <div
      className={`flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4 border ${
        notification.isRead ? "border-green-500" : "border-gray-300"
      }`}
    >
      <div className="flex items-center">
        <FaBell className="text-xl text-blue-500 mr-3" />
        <div>
          <h4 className="font-bold text-gray-800">
            {notification.title.length > 50
              ? notification.title.slice(0, 50) + "..."
              : notification.title}
          </h4>
          <p className="text-gray-600">{notification.message}</p>
          <p className="text-sm text-gray-400">
            {moment(notification.createdAt).fromNow()}
          </p>{" "}
          {/* Displaying time */}
        </div>
      </div>
      <div className="flex space-x-2">
        {!notification.isRead && (
          <button
            onClick={() => handleRead(notification._id)}
            className="btn btn-sm bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
          >
            <FaCheckCircle className="mr-1" /> Read
          </button>
        )}
        <button
          onClick={() => handleDelete(notification._id)}
          className="btn btn-sm bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        >
          <FaTrashAlt className="mr-1" /> Delete
        </button>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { authUser } = useAuthContext();

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${APP_URL}/api/notification/getAllNotificationForCurrentUser/${authUser?._id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [authUser?._id]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${APP_URL}/api/notification/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }
      const data = await response.json();
      if (data.message) {
        toast.success(data.message);
      }
      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleRead = async (id) => {
    try {
      const response = await fetch(`${APP_URL}/api/notification/read/${id}`, {
        method: "PATCH",
      });
      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }
      toast.success("Notification marked as read");
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch(
        `${APP_URL}/api/notification/deleteAll/${authUser?._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to clear all notifications");
      }
      const data = await response.json();
      if (data.length === 0) {
        toast.success("All notifications cleared successfully");
      }
      setNotifications([]);
    } catch (error) {
      console.error("Error clearing all notifications:", error);
    }
  };

  return (
    <div className="py-10 px-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-500">Notifications</h2>
        <button
          onClick={handleClearAll}
          className="btn btn-sm bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        >
          <MdClearAll className="mr-2" /> Clear All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-red-500 text-center font-bold ">No notifications found.</p>
      ) : (
        <div>
          {notifications.map((notification) => (
            <Notification
              key={notification._id}
              notification={notification}
              handleDelete={handleDelete}
              handleRead={handleRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
