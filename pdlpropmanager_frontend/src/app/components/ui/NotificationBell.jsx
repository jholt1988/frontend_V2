import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('/api/v1/notifications');
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error('Failed to load notifications', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`/api/v1/notifications/${id}`, { read: true });
      fetchNotifications();
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative inline-block text-left">
      <button onClick={() => setOpen(!open)} className="relative">
        <span className="icon-bell" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs rounded-full text-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg z-50 p-2">
          <h4 className="font-bold mb-2">Notifications</h4>
          <ul className="space-y-1">
            {notifications.map((n) => (
              <li
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`cursor-pointer text-sm p-2 rounded-md ${n.read ? 'bg-gray-100' : 'bg-blue-100 font-semibold'}`}
              >
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
