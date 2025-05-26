// src/features/notifications/NotificationsList.jsx
'use client'
import React, { useEffect, useState } from 'react';
import useNotifications from './useNotification';
import NotificationForm from './NotificationForm';
import useNotificationSocket from '@/lib/useNotificationSocket';
import useRequireAuth from '@/lib/useRequireAuth';
import{ModalTrigger} from '@/components/ui/Modal'
import { useModal } from '@/components/ui/Modal';

const NotificationsList = () => {
    const { user, loading } = useRequireAuth();
    const { show, hide } = useModal();
    const [notifications, setNotifications] = useState([]);
    const {
        refreshNotifications,
        createNotification,
        updateNotification,
        deleteNotification
    } = useNotifications();

    useNotificationSocket(user.id, (n) => {
        setNotifications((prev) => [n, ...prev]);
        info(`🔔 ${n.title}`);
    });

    useNotificationSocket(user.id, 'notification:update', (updated) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === updated.id ? updated : n))
        );
        info(`🔔 ${updated.title}`);
    });

    useNotificationSocket(user.id, 'notification:delete', (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        info(`🔔 Notification deleted`);
    });

    const [editingNotification, setEditingNotification] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        refreshNotifications();

      
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Notifications</h2>
               <ModalTrigger render={() => (
                   <NotificationForm
                    isOpen={isFormOpen}
                    initialData={editingNotification}
                    onClose={hide}
                    onSubmit={async (data) => {
                        if (editingNotification) {
                            await updateNotification(editingNotification.id, data);
                        } else {
                            await createNotification(data);
                        }
                        setIsFormOpen(false);
                    }}
                />
                )}>
                    <div
                       onClick={() => {
                           setEditingNotification(true);
                           setIsFormOpen(true);
                       }}
                       className="btn px-4 py-2 bg-blue-600 text-white rounded">
                           New Notification
                   </div>
               </ModalTrigger>
            </div>
                       
        


            {loading ? (
                <p>Loading notifications...</p>
            ) : (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left p-2">Title</th>
                            <th className="text-left p-2">Type</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Date</th>
                            <th className="text-left p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notifications.map((n) => (
                            <tr key={n.id} className="border-t">
                                <td className="p-2">{n.title}</td>
                                <td className="p-2">{n.type}</td>
                                <td className="p-2">{n.status}</td>
                                <td className="p-2">{new Date(n.createdAt).toLocaleString()}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditingNotification(n);
                                            setIsFormOpen(true);
                                        }}
                                        className="px-3 py-1 bg-yellow-400 text-white rounded"
                                    >Edit</button>
                                    <button
                                        onClick={() => deleteNotification(n.id)}
                                        className="px-3 py-1 bg-red-600 text-white rounded"
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

           
        </div>
    );
};

export default NotificationsList;
