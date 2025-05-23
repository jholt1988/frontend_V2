import React, { useState, useEffect } from 'react';
import { fetchTenants } from "../../services/apiService"; // Adjust the import path as necessary
const TenantsList = () => {
    const [tenants, setTenants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTenants = async () => {
            try {
                const data = await fetchTenants();
                setTenants(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getTenants();
    }, []);

    if (loading) return <p>Loading tenants...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Tenant List</h2>
            <ul>
                {tenants.map((tenant) => (
                    <li key={tenant.id}>{tenant.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TenantsList;
