// src/components/ActivityFeed.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const ActivityFeed = ({ items = [] }) => {
    if (!items.length) return <p className="text-sm text-gray-500">No recent activity.</p>;

    return (
        <ul className="space-y-3">
            {items.map((log, i) => (
                <li key={i} className="bg-white p-3 rounded shadow-sm flex items-start gap-3">
                    <Clock className="w-4 h-4 mt-1 text-gray-400" />
                    <div>
                        <p className="text-sm text-gray-800">{log.message}</p>
                        <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ActivityFeed;
