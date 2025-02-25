import { useState, useEffect } from "react";
import axios from "axios";
export default function MapComponent() {
  // State to hold the values of the input boxes
  const [startPointLongitude, setStartPointLongitude] = useState("");
  const [startPointLatitude, setStartPointLatitude] = useState("");
  const [endPointLongitude, setEndPointLongitude] = useState("");
  const [endPointLatitude, setEndPointLatitude] = useState("");
  const [aqi, setAqi] = useState([]);

  const fetchAqiData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/routes/optimize",
        {
          startPoint: {
            lat: startPointLatitude,
            lng: startPointLongitude,
          },
          endPoint: {
            lat: endPointLatitude,
            lng: endPointLongitude,
          },
          mode: "walking",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Optimized route response:", response.data);
      setAqi(response);
    } catch (error) {
      console.error("Error optimizing route:", error);
    }
  };

  // Function triggered on form submit (button click)
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents form from refreshing the page
    const res = await fetchAqiData();
    setAqi(res);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSearch}
          className="bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Search Route</h2>

          {/* Starting Point Input */}
          <div className="mb-4">
            <label htmlFor="startPoint" className="block text-gray-700">
              Starting Point, longitude
            </label>
            <input
              type="text"
              id="startPoint"
              value={startPointLongitude}
              onChange={(e) => setStartPointLongitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter starting point"
              />
          </div>
              {/* Starting Point Input */}
          <div className="mb-4">
            <label htmlFor="startPoint" className="block text-gray-700">
              Starting Point, latitude
            </label>
            <input
              type="text"
              id="startPoint"
              value={startPointLatitude}
              onChange={(e) => setStartPointLatitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter starting point"
            />
          </div>

          {/* Ending Point Input */}
          <div className="mb-4">
            <label htmlFor="endPoint" className="block text-gray-700">
              Ending Point, longitude
            </label>
            <input
              type="text"
              id="endPoint"
              value={endPointLongitude}
              onChange={(e) => setEndPointLongitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter ending point"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="endPoint" className="block text-gray-700">
              Ending Point, latitude
            </label>
            <input
              type="text"
              id="endPoint"
              value={endPointLatitude}
              onChange={(e) => setEndPointLatitude(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-1"
              placeholder="Enter ending point"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </form>
      </div>

      <div>
        <p>Aqi data: {aqi}</p>
      </div>
    </>
  );
}
