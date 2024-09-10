import { useState, useEffect } from "react";
import { FaBell, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import { MdClearAll } from "react-icons/md";

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
        </div>
      </div>
      <div className="flex space-x-2">
        {!notification.isRead && (
          <button
            onClick={() => handleRead(notification.id)}
            className="btn btn-sm bg-green-500 text-white flex items-center justify-center hover:bg-green-600"
          >
            <FaCheckCircle className="mr-1" /> Read
          </button>
        )}
        <button
          onClick={() => handleDelete(notification.id)}
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

  useEffect(() => {
    // Fetch notifications from API or local storage (dummy data here)
    const dummyNotifications = [
      {
        id: 1,
        title: "New Job Posted",
        message: "A new translation job has been posted.",
        isRead: false,
      },
      {
        id: 2,
        title: "Job Deadline Reminder",
        message: "Your job deadline is approaching in 2 days.",
        isRead: false,
      },
      {
        id: 3,
        title: "Payment Received",
        message: "You have received a payment of $150.",
        isRead: true,
      },
    ];
    setNotifications(dummyNotifications);
  }, []);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
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
        <p className="text-gray-500 text-center">No notifications found.</p>
      ) : (
        <div>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
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
