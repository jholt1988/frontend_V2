import TenantProfileEdit from "@/features/tenantprofile/TenantProfileEdit";
import withAuth from "@/lib/withAuth";

function TenantProfileEditPage() {
    return (
        <div className="p-6">
        <TenantProfileEdit />
        </div>
    );
}

export default withAuth(TenantProfileEditPage);
