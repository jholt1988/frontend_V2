import MaintenanceRequest from "@/features/MaintenanceRequest";


const MaintenanceRequestPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Maintenance Request</h1>
      <MaintenanceRequest />
    </div>
  );
}

export default MaintenanceRequestPage;