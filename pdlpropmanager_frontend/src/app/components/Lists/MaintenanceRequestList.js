import React, { useEffect, useState } from "react";
import { fetchMaintenanceRequests } from "../../services/apiService";

const MaintenanceRequestsList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRequests = async () => {
            try {
                const data = await fetchMaintenanceRequests();
                setRequests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getRequests();
    }, []);

    if (loading) return <p>Loading maintenance requests...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Maintenance Requests</h2>
            <ul>
                {requests.map((request) => (
                    <li key={request.id}>{`${request.issue} - ${request.status}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default MaintenanceRequestsList;
