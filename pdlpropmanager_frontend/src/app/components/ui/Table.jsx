'use client';

export default function Table({ columns = [], data = [], className = '' }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full text-left border-collapse ${className}`}>
        <thead className="bg-secondary text-text">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-4 py-2 border-b border-border font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-3 text-center text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="even:bg-primary odd:bg-secondary">
                {columns.map((col, j) => (
                  <td key={j} className="px-4 py-2 border-b border-border">
                    {col.cell ? col.cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
