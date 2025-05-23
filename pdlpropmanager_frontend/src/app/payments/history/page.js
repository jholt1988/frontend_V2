import PaymentHistory from "@/features/PaymentHistory";

const PaymentHistoryPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Payment History</h1>
      <PaymentHistory />
    </div>
  );
}

export default PaymentHistoryPage;