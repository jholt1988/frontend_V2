import TenantDirectory from "@/features/TenantDirectory";

const TenantDirectoryPage = () => {
    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-4">Tenant Directory</h1>
            <TenantDirectory />
        </div>
    );
}
export default TenantDirectoryPage;