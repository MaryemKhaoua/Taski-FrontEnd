import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
      <p className="text-lg mb-6">You do not have permission to view this page.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default Unauthorized;