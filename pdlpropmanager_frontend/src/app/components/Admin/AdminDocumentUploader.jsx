import TenantDocumentUpload from '../tenant-profile/DocumentUpload';

export default function AdminDocumentManager({ tenantId }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Manage Documents for Tenant {tenantId}</h2>
      <TenantDocumentUpload tenantId={tenantId} />
    </div>
  );
}
