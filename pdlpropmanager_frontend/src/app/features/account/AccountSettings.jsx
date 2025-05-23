'use client';

import { useContext, useState,useRef } from 'react';
import AuthContext from '@/context/AuthContext';
import { Input, Button } from '@/components/ui';
import axiosInstance from '@/services/axiosInstance';
import { useToast } from '@/components/ui/toast/ToastProvider';
import Image from 'next/image';


export default function AccountSettings() {
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(user?.avatarUrl || '/default-avatar.png');

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setUploading(true);
      const res = await axiosInstance.post(`/users/${user.id}/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAvatar(res.data.url);
      showToast('Avatar updated', 'success');
    } catch (err) {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const updateProfile = async () => {
    try {
      await axiosInstance.put(`/users/${user.id}`, form);
      showToast('Profile updated', 'success');
    } catch (err) {
      showToast('Update failed', 'error');
    }
  };

  const updatePassword = async () => {
    if (passwordForm.new !== passwordForm.confirm) {
      return showToast('Passwords do not match', 'error');
    }

    try {
      await axiosInstance.post(`/users/${user.id}/change-password`, passwordForm);
      showToast('Password changed', 'success');
      setPasswordForm({ current: '', new: '', confirm: '' });
    } catch (err) {
      showToast('Password change failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Info */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Profile</h3>
        <Input name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full Name" />
        <Input name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <Input name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
        <Button onClick={updateProfile}>Update Profile</Button>
      </section>

      {/* Password */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <Input type="password" name="current" placeholder="Current Password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} />
        <Input type="password" name="new" placeholder="New Password" value={passwordForm.new} onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })} />
        <Input type="password" name="confirm" placeholder="Confirm New Password" value={passwordForm.confirm} onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })} />
        <Button onClick={updatePassword}>Change Password</Button>
      </section>
      <section className="space-y-4">
  <h3 className="text-xl font-semibold">Avatar</h3>
  <div className="flex items-center gap-4">
    <Image
      src={avatar}
      alt="Avatar"
      width={64}
      height={64}
      className="rounded-full object-cover"
    />
    <div>
      <Button onClick={() => fileRef.current.click()} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Change Avatar'}
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  </div>
</section>

    </div>
  );
}
