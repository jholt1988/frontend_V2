'use client';

import React, { useState } from 'react';
import useTenants from './useTenants';
import usePagination from '@/features/pagination/usePagination';
import PaginationControls from '@/features/pagination/PaginationControls';
import ResponsiveListTable from '@/components/ResponsiveListTable';
import { Card, Button } from '@/components/ui';
import { ModalTrigger } from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import { useToast } from '@/lib/useToast';
import TenantForm from './TenantForm';
import useRequiredAuth from '@/lib/useRequireAuth';
import withAuth from '@/lib/withAuth';

function TenantManager() {
  const { user, loading } = useRequiredAuth();
  const {
    tenants,
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

  const { success } = useToast();

  const handleDelete = async (id) => {
    await deleteTenant(id);
    success('Tenant deleted');
  };

  const handleSubmit = async (tenantData) => {
    if (tenantData.id) {
      await updateTenant(tenantData.id, tenantData);
    } else {
      await createTenant(tenantData);
    }
  };

  return (
    <Card className="space-y-6">
      <h2 className="text-2xl font-bold">Tenants</h2>

      <ResponsiveListTable
        columns={['Name', 'Email', 'Phone', 'Property', 'Actions']}
        data={paginatedData}
        keyField="id"
        renderRow={(tenant, mode) => {
          if (mode === "card") {
            // Mobile card view
            return (
              <div>
                <div><strong>Name:</strong> {tenant.name}</div>
                <div><strong>Email:</strong> {tenant.email}</div>
                <div><strong>Phone:</strong> {tenant.phone}</div>
                <div><strong>Property:</strong> {tenant.property?.name || 'Unassigned'}</div>
                <div className="space-x-2 mt-2">
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
                    <div variant="danger">Delete</div>
                  </ModalTrigger>
                </div>
              </div>
            );
          }
          // Table row view
          return (
            <>
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
                  <div variant="danger">Delete</div>
                </ModalTrigger>
              </td>
            </>
          );
        }}
      />

      <ModalTrigger
        render={(hide) => (
          <TenantForm
            onSubmit={handleSubmit}
            onClose={hide}
          />
        )}
      >
        <div className='btn '>Create</div>
      </ModalTrigger>

      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        onNext={nextPage}
        onPrev={prevPage}
        onGoTo={goToPage}
      />
    </Card>
  );
}

export default withAuth(TenantManager, ['admin', 'staff']);