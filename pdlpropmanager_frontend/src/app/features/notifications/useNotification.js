// src/features/notifications/useNotifications.js
import { useState, useEffect } from 'react';
import {
    getNotifications,
    createNotification as apiCreate,
    updateNotification as apiUpdate,
    deleteNotification as apiDelete
} from '@/services/apiService';
import { useToast } from '@/lib/useToast';
import useNotificationSocket from '@/lib/useNotificationSocket';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const {success, error, info} = useToast();
     const socket = useNotificationSocket();

    const refreshNotifications = async () => {
        try {
            const { data } = await getNotifications();
            setNotifications(data);
        } catch {
            error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const createNotification = async (data) => {
        await apiCreate(data);
        success('Notification created');
    };

    const updateNotification = async (id, data) => {
        await apiUpdate(id, data);
        success('Notification updated');
    };

    const deleteNotification = async (id) => {
        await apiDelete(id);
        success('Notification deleted');
    };

    useEffect(() => {
        refreshNotifications();

       
        socket.on('connect', () => {
            info('Connected to notification service');
        });

        socket.on('notification:new', (n) => {
            setNotifications((prev) => [n, ...prev]);
            info(`🔔 ${n.title}`);
        });

        socket.on('notification:update', (updated) => {
            setNotifications((prev) => prev.map((n) => n.id === updated.id ? updated : n));
        });

        socket.on('notification:delete', (id) => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return {
        notifications,
        loading,
        createNotification,
        updateNotification,
        deleteNotification,
        refreshNotifications
    };
};

export default useNotifications;
