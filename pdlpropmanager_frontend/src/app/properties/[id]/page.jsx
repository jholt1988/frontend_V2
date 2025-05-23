'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/services/axiosInstance';
import { Card, Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axiosInstance.get(`/properties/${id}`);
        setProperty(res.data);
      } catch (err) {
        console.error('Failed to load property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!property) return <p className="p-6">Property not found.</p>;

  return (
    <Card className="space-y-6 max-w-4xl mx-auto mt-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{property.name}</h1>
        <Button onClick={() => router.back()}>Back</Button>
      </div>

      <div className="space-y-2 text-gray-300">
        <p><strong>Address:</strong> {property.address}</p>
        <p><strong>Units:</strong> {property.unitCount}</p>
        <p><strong>Status:</strong> {property.status}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-3">Tenants</h2>
        <ul className="space-y-2">
          {property.tenants?.length > 0 ? (
            property.tenants.map(tenant => (
              <li key={tenant.id} className="bg-secondary p-3 rounded flex justify-between">
                <span>{tenant.name}</span>
                <span className="text-sm text-gray-400">{tenant.email}</span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tenants assigned.</p>
          )}
        </ul>
      </div>
    </Card>
  );
}
