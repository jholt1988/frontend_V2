// src/components/DateRangeFilter.jsx
import React from 'react';

const DateRangeFilter = ({ startDate, endDate, onChange }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <label className="text-sm text-gray-600">
                From:
                <input
                    type="date"
                    value={startDate || ''}
                    onChange={(e) => onChange({ startDate: e.target.value, endDate })}
                    className="block mt-1 border px-2 py-1 rounded"
                />
            </label>
            <label className="text-sm text-gray-600">
                To:
                <input
                    type="date"
                    value={endDate || ''}
                    onChange={(e) => onChange({ startDate, endDate: e.target.value })}
                    className="block mt-1 border px-2 py-1 rounded"
                />
            </label>
        </div>
    );
};

export default DateRangeFilter;
