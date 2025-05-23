'use client';

import { useEffect, useState, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import { getTenantProfile, updateTenantProfile } from '@/services/apiService';
import { Input, Button, Card } from '@/components/ui';

export default function TenantProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getTenantProfile(user.id).then((data) => {
        setProfile(data);
        setFormData(data);
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await updateTenantProfile(user.id, formData);
    setProfile(updated);
    setIsEditing(false);
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl font-bold">Tenant Profile</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input name="phone" value={formData.phone || ''} onChange={handleChange} placeholder="Phone" />
          <Input name="address" value={formData.address || ''} onChange={handleChange} placeholder="Address" />
          <Input type="date" name="leaseStart" value={formData.leaseStart || ''} onChange={handleChange} />
          <Input type="date" name="leaseEnd" value={formData.leaseEnd || ''} onChange={handleChange} />
          <Input type="number" name="rentAmount" value={formData.rentAmount || ''} onChange={handleChange} placeholder="Rent Amount" />

          <div className="flex gap-3">
            <Button type="submit">Save</Button>
            <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Lease Start:</strong> {profile.leaseStart}</p>
          <p><strong>Lease End:</strong> {profile.leaseEnd}</p>
          <p><strong>Rent:</strong> ${profile.rentAmount}</p>
        

          <Button variant="primary" className="mt-4" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      )}
    </Card>
  );
}
