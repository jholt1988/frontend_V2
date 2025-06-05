import TenantDirectory from "@/features/TenantDirectory";
import { ModalTrigger } from "@/components/ui/Modal";
import TenantForm from "@/features/tenants/TenantForm";
import TenantManager from "@/features/tenants/TenantManager";
import { Card } from "@/components/ui";

const TenantDirectoryPage = () => {
    return (
        <>x
        <Card className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4">Tenant Directory</h1>
            <TenantDirectory />
            <p className="text-gray-600 mt-4">
                Manage your tenant information, view details, and perform actions like editing or deleting records.
            </p>
            <TenantManager />
            </Card>
        </>
            
    );
}   
export default TenantDirectoryPage;