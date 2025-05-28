export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Return to Home</a>
    </div>
  );
}
