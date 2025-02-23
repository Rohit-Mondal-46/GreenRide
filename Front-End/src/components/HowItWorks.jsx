import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="text-center py-16 bg-green-600 text-white">
      <h1 className="text-5xl font-bold">Smart Bike Route Planner 🚴‍♂️</h1>
      <p className="mt-4 text-lg">Find the cleanest and safest routes with real-time air quality updates.</p>
      <Link to="/map">
        <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-200 transition">
          Get Started
        </button>
      </Link>
    </section>
  );
}
