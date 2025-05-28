import { useEffect, useState } from 'react';
import { getNotifications, markNotificationRead } from '@/services/apiService';
import useNotificationSocket from '@/lib/useNotificationSocket';
import { Bell } from 'lucide-react';

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    fetchNotifications();
  };

  useNotificationSocket(userId, {
    'notification:new': () => {
      fetchNotifications();
    },
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="relative btn btn-ghost">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="badge badge-error badge-sm absolute -top-1 -right-1">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 bg-white shadow-xl rounded border overflow-y-auto max-h-96">
          <div className="p-2 border-b font-semibold text-sm">Notifications</div>
          {notifications.length === 0 && <div className="p-4 text-sm">No notifications</div>}
          {notifications.map(note => (
            <div key={note.id} className={`p-2 border-b text-sm cursor-pointer ${note.read ? 'bg-gray-50' : 'bg-white'}`} onClick={() => handleMarkRead(note.id)}>
              <div>{note.message}</div>
              <div className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
