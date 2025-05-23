
import { useEffect, useState } from 'react';
import api from '../../utils/axios';

const useLedger = ({ tenantId, propertyId } = {}) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLedger = async () => {
            try {
                const res = await api.get('/ledger', {
                    params: { tenantId, propertyId }
                });

                // Compute running balance
                let balance = 0;
                const dataWithBalance = res.data.map((entry) => {
                    balance += (entry.debit || 0) - (entry.credit || 0);
                    return { ...entry, balance: balance.toFixed(2) };
                });

                setEntries(dataWithBalance);
            } catch (err) {
                console.error('Failed to fetch ledger', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLedger();
    }, [tenantId, propertyId]);

    return { entries, loading };
};

export default useLedger;