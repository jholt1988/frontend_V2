'use client';
import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function useNotificationSocket(userId, onNewNotification) {
  useEffect(() => {
    if (!userId) return;

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      query: { userId },
    });

    socket.on('notification:new', (notification) => {
      onNewNotification(notification);
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId, onNewNotification]);
} 

// Example usage in NotificationBell
// const { user } = useContext(AuthContext);
// useNotificationSocket(user?.id, (newNote) => setNotifications(prev => [newNote, ...prev]));
