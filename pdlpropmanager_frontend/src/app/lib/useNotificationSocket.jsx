import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useNotificationSocket(userId, onNewNotification) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("ws://localhost:5000" ,{
      path: '/socket',
      transports: ['websocket'],
      query: { userId },
      reconnection: true,
    });

    socketRef.current = socket;

    socket.emit('join', userId);

    socket.on('notification:new', (notification) => {
      if (onNewNotification) {
        onNewNotification(notification);
      }
    });

    
  }, [userId, onNewNotification]);

  return socketRef;
}
