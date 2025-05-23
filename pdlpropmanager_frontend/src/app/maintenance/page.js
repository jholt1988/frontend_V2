import MaintenanceList from "@/features/MaintenanceList";

const MaintenanceListPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Maintenance List</h1>
      <MaintenanceList />
    </div>
  );
}

export default MaintenanceListPage;