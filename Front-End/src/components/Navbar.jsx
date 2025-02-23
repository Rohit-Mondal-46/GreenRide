import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">GreenRide🚲 </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/map" className="hover:text-gray-300">Map</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
      </div>
    </nav>
  );
}
