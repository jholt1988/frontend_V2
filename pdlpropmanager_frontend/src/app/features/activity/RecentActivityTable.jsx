import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentActivityTable({ source }) {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const res = await axios.get(`/api/v1/${source}/recent`);
        setActivity(res.data);
      } catch (err) {
        console.error(`Failed to fetch ${source} activity`, err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [source]);

  if (loading) return <p>Loading recent {source} activity...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Recent {source.charAt(0).toUpperCase() + source.slice(1)} Activity</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Detail</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((entry, index) => (
            <tr key={index}>
              <td className="p-2 border">{new Date(entry.date).toLocaleDateString()}</td>
              <td className="p-2 border capitalize">{entry.type}</td>
              <td className="p-2 border">{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
