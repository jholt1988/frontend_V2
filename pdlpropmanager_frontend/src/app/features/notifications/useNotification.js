// src/features/notifications/useNotifications.js
import { useState, useEffect } from 'react';
import {
    getNotifications,
    createNotification as apiCreate,
    updateNotification as apiUpdate,
    deleteNotification as apiDelete
} from '@/services/apiService';
import { useToast } from '@/lib/useToast';
import useRequireAuth from '@/lib/useRequireAuth';

const useNotifications = () => {
    const { user, loading } = useRequireAuth();
    const [notifications, setNotifications] = useState([]);
    const [isLoading , setIsLoading] = useState(loading);
    const {success, error, info} = useToast();
   
    const refreshNotifications = async () => {
        try {
            const { data } = await getNotifications(user.id);
            setNotifications(data);
        } catch {
            error('Failed to load notifications');
        } finally {
            setIsLoading(!isLoading);
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

    // useEffect(() => {
    //     refreshNotifications();

    //     socket(user.id, (n) => {
    //         setNotifications((prev) => [n, ...prev]);
    //         info(`🔔 ${n.title}`);
    //     });

    //     socket(user.id, 'notification:update', (updated) => {
    //         setNotifications((prev) => prev.map((n) => n.id === updated.id ? updated : n));
    //     });

    //     useNotificationSocket(user.id, 'notification:delete', (id) => {
    //         setNotifications((prev) => prev.filter((n) => n.id !== id));
    //     });

    //     return () => {
    //         socket.disconnect();
    //     };
    // }, []);

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
