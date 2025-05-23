'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { Card, Button, Badge } from '@/components/ui';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import PropertyForm from './PropertyForm';
import { useToast } from '@/components/ui/toast/ToastProvider';

export default function PropertyManager() {
  const [properties, setProperties] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { showToast } = useToast();

  const fetchProps = async () => {
    const res = await axiosInstance.get('/properties');
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProps();
  }, []);

  const handleDelete = async (id) => {
    await axiosInstance.delete(`/properties/${id}`);
    showToast('Property deleted', 'success');
    fetchProps();
  };

  const handleSave = async (data) => {
    if (editing) {
      await axiosInstance.put(`/properties/${editing.id}`, data);
      showToast('Property updated');
    } else {
      await axiosInstance.post('/properties', data);
      showToast('Property created');
    }

    setIsOpen(false);
    setEditing(null);
    fetchProps();
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => { setEditing(null); setIsOpen(true); }}>
          Add Property
        </Button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-secondary text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Units</th>
            <th className="p-2">Manager</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.unitCount}</td>
              <td className="p-2">{p.manager}</td>
              <td className="p-2"><Badge>{p.status}</Badge></td>
              <td className="p-2 space-x-2">
                <Button variant="secondary" onClick={() => { setEditing(p); setIsOpen(true); }}>Edit</Button>
                <ModalTrigger
                  render={() => (
                    <ConfirmModal title="Delete Property?" onConfirm={() => handleDelete(p.id)} />
                  )}
                >
                  <Button variant="danger">Delete</Button>
                </ModalTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <PropertyForm
          initialData={editing}
          onClose={() => setIsOpen(false)}
          onSubmit={handleSave}
        />
      )}

      <ModalContent />
    </Card>
  );
}
