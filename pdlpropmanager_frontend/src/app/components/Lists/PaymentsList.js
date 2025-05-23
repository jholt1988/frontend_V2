import React, { useEffect, useState } from 'react';
import { fetchPayments } from "../../services/apiService"; // Adjust the import path as necessary
const PaymentsList = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPayments = async () => {
            try {
                const data = await fetchPayments();
                setPayments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getPayments();
    }, []);

    if (loading) return <p>Loading payments...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container">
            <div className="card">
            <h2 className="text-center">Payment List</h2>
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id}>{`${payment.amount} - ${payment.status}`}</li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default PaymentsList;