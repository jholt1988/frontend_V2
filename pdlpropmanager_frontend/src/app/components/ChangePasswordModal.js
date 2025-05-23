import React, { useState } from 'react';
import ModalWrapper from './ui/ModalWrapper';
import Input from './ui/Input';
import Button from './ui/Button';
import { showSuccess, showError } from './ui/toast';
import api from '../utils/axios'; // Adjust the path if needed

const ChangePasswordModal = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showError('New passwords do not match');
            return;
        }
        try {
            setLoading(true);
            await api.post('/auth/change-password', {
                currentPassword,
                newPassword,
            });
            showSuccess('Password changed successfully!');
            onClose();
        } catch (err) {
            console.error(err);
            showError('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ModalWrapper title="Change Password" onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
                <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <div className="text-right">
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Update Password'}
                    </Button>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default ChangePasswordModal;
