import React,{useState} from 'react';
import ResponsiveListTable from '../../components/ResponsiveListTable';
import LeaseForm from './LeaseForm';
import useLeases from './useLeases';
import usePagination from '../pagination/usePagination';
import PaginationControls from '../pagination/PaginationControls';

const LeaseManager = () => {
   const { leases, loading, createLease, updateLease, deleteLease } =
    useLeases();  
  
const {
    paginatedData: paginatedLeases,
    currentPage,
    maxPage,
    nextPage,
    prevPage,
    goToPage } = usePagination(leases, 10);
   
  

  const [editingRequest, setEditingRequest] = useState(null);
  const[isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leases</h2>
      <ResponsiveListTable
        columns={["Tenant", "Property", "Start", "End", "Status", "Actions"]}
        data={paginatedLeases}
        keyField="id"
        renderRow={(lease, mode) =>
          mode === "table" ? (
            <>
              <td>{lease.tenantName}</td>
              <td>{lease.propertyName}</td>
              <td>{lease.startDate}</td>
              <td>{lease.endDate}</td>
              <td>{lease.status}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingRequest(lease);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteLease(lease.id)}>Delete</button>
              </td>
            </>
          ) : (
            <>
              <div>
                <strong>Tenant:</strong> {lease.tenantName}
              </div>
              <div>
                <strong>Property:</strong> {lease.propertyName}
              </div>
              <div>
                <strong>Start:</strong> {lease.startDate}
              </div>
              <div>
                <strong>End:</strong> {lease.endDate}
                </div>
                <div>
                  <strong>Monthly Rent:</strong> {lease.monthlyRent}
                </div>
              <div>
                <strong>Status:</strong> {lease.status}
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingRequest(null);
                    setIsFormOpen(true);
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setEditingRequest(lease);
                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteLease(lease.id)}>Delete</button>
              </div>
            </>
          )
        }
      />

      {isFormOpen && (
        <leaseForm
          initialData={editingRequest}
          onClose={() => setIsFormOpen(false)}
          onSubmit={async (data) => {
            if (editingRequest) {
              await updateLease(editingRequest.id, data);
            } else {
              await createLease(data);
            }
            setIsFormOpen(false);
          }}
        />
      )}
      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        onNext={nextPage}
        onPrev={prevPage}
        onGoTo={goToPage}
      />
    </div>
  );
}

export default LeaseManager;
