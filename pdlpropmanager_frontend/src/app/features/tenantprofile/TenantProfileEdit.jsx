import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

export default function TenantProfileEdit() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`/api/v1/tenants/${user.id}`).then(res => {
        setForm(prev => ({ ...prev, ...res.data }));
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert('Name is required');
    if (form.password && form.password !== form.confirmPassword) return alert("Passwords don't match");

    const payload = {
      name: form.name,
      phoneNumber: form.phoneNumber,
    };

    if (form.password) payload.password = form.password;

    try {
      await axios.put(`/api/v1/tenants/${user.id}`, payload);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit My Profile</h1>
      <label className="block">
        Name
        <input name="name" value={form.name} onChange={handleChange} className="input input-bordered w-full" required />
      </label>
      <label className="block">
        Email
        <input name="email" type="email" value={form.email} className="input input-bordered w-full" readOnly />
      </label>
      <label className="block">
        Phone Number
        <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="input input-bordered w-full" />
      </label>
      <label className="block">
        New Password
        <input name="password" type="password" value={form.password} onChange={handleChange} className="input input-bordered w-full" />
      </label>
      <label className="block">
        Confirm Password
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="input input-bordered w-full" />
      </label>
      <button type="submit" className="btn btn-primary">Save Changes</button>
    </form>
  );
}
