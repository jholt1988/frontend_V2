import React, { useEffect, useState } from "react";
import {
  fetchNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} from "../../services/apiService";

const NotificationsList = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newNotification, setNewNotification] = useState({ message: "", type: "Info" });

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getNotifications();
    }, []);

    const handleCreateNotification = async () => {
        try {
            const notification = await createNotification(newNotification);
            setNotifications([...notifications, notification]);
            setNewNotification({ message: "", type: "Info" });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await markNotificationAsRead(id);
            setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteNotification = async (id) => {
        try {
            await deleteNotification(id);
            setNotifications(notifications.filter((n) => n.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        {`${notification.type}: ${notification.message} `}
                        {notification.read ? "(Read)" : "(Unread)"}
                        <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>
                        <button onClick={() => handleDeleteNotification(notification.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Create New Notification</h3>
            <input
                type="text"
                placeholder="Message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            />
            <button onClick={handleCreateNotification}>Send Notification</button>
        </div>
    );
};

export default NotificationsList;
