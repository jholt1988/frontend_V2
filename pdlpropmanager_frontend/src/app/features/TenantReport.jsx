'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTenantPayments, getTenantMaintenance } from '@/services/apiService';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function TenantReport() {
  const { id } = useParams();
  const reportRef = useRef();
  const [payments, setPayments] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getTenantPayments(id).then(setPayments);
    getTenantMaintenance(id).then(setRequests);
  }, [id]);

  const exportPDF = async () => {
    const canvas = await html2canvas(reportRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 10, width, height);
    pdf.save(`tenant-report-${id}.pdf`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tenant Report: ID #{id}</h2>

      <button onClick={exportPDF} className="btn btn-secondary mb-4">Export PDF</button>

      <div ref={reportRef} className="space-y-6">
        <section>
          <h3 className="font-semibold text-lg">Payments</h3>
          <ul className="text-sm space-y-1">
            {payments.map(p => (
              <li key={p.id}>
                ${p.amount} — {p.status} — {new Date(p.paidAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-lg">Maintenance Requests</h3>
          <ul className="text-sm space-y-1">
            {requests.map(r => (
              <li key={r.id}>
                {r.description} — {r.status} — {new Date(r.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
