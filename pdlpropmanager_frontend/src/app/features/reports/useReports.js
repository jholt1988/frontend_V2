// src/features/reports/useReports.js
import { useState } from 'react';
import { fetchReports } from './reports.api';
import { toast } from 'react-toastify';

const useReports = () => {
    const [data, setData] = useState({});

    const loadReports = async () => {
        try {
            const response = await fetchReports();
            setData(response.data);
        } catch (err) {
            toast.error('Failed to load reports');
        }
    };

    return { data, loadReports };
};

export default useReports;
