import * as tf from "@tensorflow/tfjs";

// Define a simple neural network model
const createModel = () => {
    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [3], units: 8, activation: "relu" })); // Input: Temp, Wind, Rain
    model.add(tf.layers.dense({ units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1, activation: "linear" })); // Output: Travel Time Impact
    model.compile({ optimizer: "adam", loss: "meanSquaredError" });
    return model;
};

// Train the model with sample weather data
const trainModel = async (model) => {
    const weatherData = tf.tensor2d([
        [25, 10, 0], // 25°C, 10km/h wind, No rain -> Normal travel time
        [30, 20, 0], // 30°C, 20km/h wind, No rain -> Slight delay
        [15, 5, 1],  // 15°C, 5km/h wind, Rain -> Delay
        [10, 30, 1], // 10°C, 30km/h wind, Heavy rain -> High delay
    ]);

    const travelTimeImpact = tf.tensor2d([[1], [1.2], [1.5], [2.0]]); // Delay multipliers

    await model.fit(weatherData, travelTimeImpact, { epochs: 100 });
};

// Predict travel time impact based on weather
const predictImpact = async (model, temp, wind, rain) => {
    const input = tf.tensor2d([[temp, wind, rain]]);
    const output = model.predict(input);
    return (await output.data())[0]; // Get first (and only) prediction
};

export { createModel, trainModel, predictImpact };
