import { useState, useEffect } from "react";
import axios from "axios";
import { createModel, trainModel, predictImpact } from "./WeatherImpactModel";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [impact, setImpact] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => {
        const initModel = async () => {
            const newModel = createModel();
            await trainModel(newModel);
            setModel(newModel);
        };
        initModel();
    }, []);

    const getWeather = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
            setWeather(response.data);
            setError(null);

            if (model) {
                const temp = response.data.current.temp_c;
                const wind = response.data.current.wind_kph;
                const rain = response.data.current.condition.text.includes("rain") ? 1 : 0;
                
                const impactResult = await predictImpact(model, temp, wind, rain);
                setImpact(impactResult.toFixed(2));
            }
        } catch (err) {
            setError("Failed to fetch weather data");
            setWeather(null);
            setImpact(null);
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">🌦️ AI-Powered Weather Impact</h2>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="p-2 border rounded w-full mt-2"
            />
            <button onClick={getWeather} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                Get Weather
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {weather && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{weather.location.name}, {weather.location.country}</h3>
                    <p>🌡️ Temp: {weather.current.temp_c}°C</p>
                    <p>💨 Wind: {weather.current.wind_kph} km/h</p>
                    <p>☁️ Condition: {weather.current.condition.text}</p>
                    <p>🌍 AQI: {weather.current.air_quality.pm2_5}</p>

                    {impact && (
                        <div className="mt-4 p-2 bg-yellow-200 rounded">
                            <p>🚲 Predicted Travel Time Impact: <strong>{impact}x</strong> (multiplier on normal time)</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
