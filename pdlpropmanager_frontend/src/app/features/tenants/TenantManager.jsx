'use client';

import React,{useState} from 'react';
import useTenants from './useTenants';
import usePagination from '@/features/pagination/usePagination';
import PaginationControls from '@/features/pagination/PaginationControls';
import ResponsiveListTable from '@/components/ResponsiveListTable';
import { Card, Button } from '@/components/ui';
import { Modal, ModalTrigger, ModalContent } from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/modal/ConfirmModal';
import { useToast } from '@/lib/useToast';
import TenantForm from './TenantForm';
import useRequiredAuth from '@/lib/useRequireAuth';


export default function TenantManager() {
  const { user, loading } = useRequiredAuth()
  const [selectedTenant, setSelectedTenant] = useState(null);
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

  const { success, error} = useToast();

  const handleDelete = async (id) => {
    await deleteTenant(id);
    success('Tenant deleted');
  };

  const handleSubmit = async (tenantData) => {
    if (tenantData.id) {
    setSelectedTenant(tenantData);
      await updateTenant(tenantData.id, tenantData);
    } else {
      await createTenant(tenantData);
    }
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
<ModalTrigger
                
                render={(hide) => (
                  <TenantForm
                    initialData={tenant}
                    onSubmit={handleSubmit}
                    onClose={hide}
                  />
                )}
    >
                <Button className='button'> 'Create'</Button>
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
