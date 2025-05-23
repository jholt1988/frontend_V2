'use client';

import React, { useState } from 'react';
import useMaintenance from './useMaintenance';
import MaintenanceForm from './MaintenanceForm';
import { Button, Badge, Card } from '@/components/ui';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import { useToast } from '@/components/ui/toast/ToastProvider';

export default function MaintenanceManager() {
  const {
    requests,
    loading,
    createRequest,
    updateRequest,
    deleteRequest,
  } = useMaintenance();

  const [editingRequest, setEditingRequest] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async (id) => {
    await deleteRequest(id);
    showToast('Request deleted', 'success');
  };

  const handleSubmit = async (data) => {
    if (editingRequest) {
      await updateRequest(editingRequest.id, data);
      showToast('Request updated', 'success');
    } else {
      await createRequest(data);
      showToast('Request created', 'success');
    }
    setIsFormOpen(false);
  };

  return (
    <Card className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Maintenance Requests</h2>
        <Button
          onClick={() => {
            setEditingRequest(null);
            setIsFormOpen(true);
          }}
        >
          New Request
        </Button>
      </div>

      {loading ? (
        <p>Loading requests...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">Title</th>
              <th className="text-left p-2">Property</th>
              <th className="text-left p-2">Priority</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-t">
                <td className="p-2">{req.title}</td>
                <td className="p-2">{req.propertyName}</td>
                <td className="p-2">{req.priority}</td>
                <td className="p-2">
                  <Badge variant="info">{req.status}</Badge>
                </td>
                <td className="p-2 space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditingRequest(req);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <ModalTrigger
                    render={() => (
                      <ConfirmModal
                        title="Delete Request?"
                        message="This cannot be undone."
                        onConfirm={() => handleDelete(req.id)}
                      />
                    )}
                  >
                    <Button variant="danger">Delete</Button>
                  </ModalTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isFormOpen && (
        <MaintenanceForm
          initialData={editingRequest}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      <ModalContent />
    </Card>
  );
}
