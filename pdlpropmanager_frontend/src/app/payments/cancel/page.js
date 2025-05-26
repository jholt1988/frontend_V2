export default function PaymentCancelled() {
  return (
    <div className="max-w-xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
      <p className="text-lg">You cancelled the payment. No charges were made.</p>
    </div>
  );
}