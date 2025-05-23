'use client';

import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Papa from 'papaparse';

export default function ExportControls({ data, filename, chartRef }) {
  const exportCSV = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${filename}.csv`);
  };

  const exportPDF = async () => {
    if (!chartRef?.current) return;

    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 10, width, height);
    pdf.save(`${filename}.pdf`);
  };

  return (
    <div className="flex gap-3 mt-4">
      <button onClick={exportCSV} className="btn btn-secondary">Export CSV</button>
      <button onClick={exportPDF} className="btn btn-secondary">Export PDF</button>
    </div>
  );
}
