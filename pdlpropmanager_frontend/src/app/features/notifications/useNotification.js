// src/features/notifications/useNotifications.js
import { useState, useEffect } from 'react';
import {
    getNotifications,
    createNotification as apiCreate,
    updateNotification as apiUpdate,
    deleteNotification as apiDelete
} from './notification.api';
import { toast } from 'react-toastify';
import socket from '../../utils/socket';

const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshNotifications = async () => {
        try {
            const { data } = await getNotifications();
            setNotifications(data);
        } catch {
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const createNotification = async (data) => {
        await apiCreate(data);
        toast.success('Notification created');
    };

    const updateNotification = async (id, data) => {
        await apiUpdate(id, data);
        toast.success('Notification updated');
    };

    const deleteNotification = async (id) => {
        await apiDelete(id);
        toast.success('Notification deleted');
    };

    useEffect(() => {
        refreshNotifications();

        socket.connect();

        socket.on('notification:new', (n) => {
            setNotifications((prev) => [n, ...prev]);
            toast.info(`🔔 ${n.title}`);
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
