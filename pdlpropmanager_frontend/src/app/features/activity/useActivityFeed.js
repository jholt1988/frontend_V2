// src/features/activity/useActivityFeed.js
import { useState, useEffect } from 'react';
import socket from '../../utils/socket';

const useActivityFeed = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        socket.connect();

        socket.on('activity:new', (log) => {
            setLogs((prev) => [log, ...prev.slice(0, 19)]);
        });

        return () => socket.disconnect();
    }, []);

    return { logs };
};

export default useActivityFeed;
