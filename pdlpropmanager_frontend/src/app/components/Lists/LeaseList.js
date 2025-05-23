import React, { useEffect, useState } from "react";
import { fetchLeases, createLease, updateLease, deleteLease } from "../../services/apiService";

const LeasesList = () => {
    const [leases, setLeases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newLease, setNewLease] = useState({ property: "", tenant: "", status: "Active" });

    useEffect(() => {
        const getLeases = async () => {
            try {
                const data = await fetchLeases();
                setLeases(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getLeases();
    }, []);

    const handleCreateLease = async () => {
        try {
            const lease = await createLease(newLease);
            setLeases([...leases, lease]);
            setNewLease({ property: "", tenant: "", status: "Active" });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateLease = async (id) => {
        try {
            const updatedLease = await updateLease(id, { status: "Updated" });
            setLeases(leases.map((lease) => (lease.id === id ? updatedLease : lease)));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteLease = async (id) => {
        try {
            await deleteLease(id);
            setLeases(leases.filter((lease) => lease.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading leases...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lease Agreements</h2>
            <ul>
                {leases.map((lease) => (
                    <li key={lease.id}>
                        {`${lease.property} - ${lease.tenant} - ${lease.status}`}
                        <button onClick={() => handleUpdateLease(lease.id)}>Update</button>
                        <button onClick={() => handleDeleteLease(lease.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h3>Create New Lease</h3>
            <input
                type="text"
                placeholder="Property"
                value={newLease.property}
                onChange={(e) => setNewLease({ ...newLease, property: e.target.value })}
            />
            <input
                type="text"
                placeholder="Tenant"
                value={newLease.tenant}
                onChange={(e) => setNewLease({ ...newLease, tenant: e.target.value })}
            />
            <button onClick={handleCreateLease}>Create Lease</button>
        </div>
    );
};

export default LeasesList;
