'use client';

import React from 'react';
import useTenants from './useTenants';
import usePagination from '@/features/pagination/usePagination';
import PaginationControls from '@/features/pagination/PaginationControls';
import ResponsiveListTable from '@/components/ResponsiveListTable';
import { Card, Button } from '@/components/ui';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import { useToast } from '@/components/ui/toast/ToastProvider';

export default function TenantManager() {
  const {
    tenants,
    loading,
    createTenant,
    updateTenant,
    deleteTenant,
  } = useTenants();

  const {
    paginatedData,
    currentPage,
    maxPage,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(tenants, 10);

  const { showToast } = useToast();

  const handleDelete = async (id) => {
    await deleteTenant(id);
    showToast('Tenant deleted', 'success');
  };

  return (
    <Card className="space-y-6">
      <h2 className="text-2xl font-bold">Tenants</h2>

      <ResponsiveListTable
        columns={['Name', 'Email', 'Phone', 'Actions', 'Property']}
        data={paginatedData}
        keyField="id"
        renderRow={(tenant) => (
          <tr key={tenant.id}>
            <td>{tenant.name}</td>
            <td>{tenant.email}</td>
            <td>{tenant.phone}</td>
            
<td className="p-2">{tenant.property?.name || 'Unassigned'}</td>

            <td className="space-x-2">
              <Button variant="secondary" onClick={() => updateTenant(tenant)}>Edit</Button>

              <ModalTrigger
                render={() => (
                  <ConfirmModal
                    title="Delete Tenant?"
                    message={`Are you sure you want to delete ${tenant.name}?`}
                    onConfirm={() => handleDelete(tenant.id)}
                  />
                )}
              >
                <Button variant="danger">Delete</Button>
              </ModalTrigger>
            </td>
          </tr>
        )}
      />

      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        onNext={nextPage}
        onPrev={prevPage}
        onGoTo={goToPage}
      />

      <ModalContent />
    </Card>
  );
}
