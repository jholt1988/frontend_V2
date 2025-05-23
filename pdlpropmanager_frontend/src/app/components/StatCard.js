import React from 'react';
import { cn } from '../utils/cn'; // optional: for conditional classnames

const StatCard = ({ icon: Icon, title, value, color = 'blue', sublabel }) => {
    const bg = {
        blue: 'bg-blue-100 text-blue-700',
        green: 'bg-green-100 text-green-700',
        red: 'bg-red-100 text-red-700',
        yellow: 'bg-yellow-100 text-yellow-700',
    }[color] || 'bg-gray-100 text-gray-700';

    return (
        <div className="flex items-center justify-between p-4 rounded-lg shadow-sm bg-white">
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-xl font-semibold text-gray-800">{value}</h3>
                {sublabel && <p className="text-xs text-gray-400">{sublabel}</p>}
            </div>
            {Icon && (
                <div className={cn("p-3 rounded-full", bg)}>
                    <Icon className="w-5 h-5" />
                </div>
            )}
        </div>
    );
};

export default StatCard;
