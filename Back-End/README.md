# Health-Optimized Route Planner

A route optimization system that considers air quality data to provide users with healthier travel routes. This project integrates GraphHopper for route calculation and OpenWeatherMap for real-time air quality data.

## Features

- Multiple route calculations between two points
- Real-time air quality data integration
- Health score calculation based on AQI and travel mode
- Route caching for improved performance
- PostgreSQL database for data persistence
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- GraphHopper API key
- OpenWeatherMap API key

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd health-route-optimizer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and fill in your configuration:
```bash
cp .env.example .env
```

4. Set up the PostgreSQL database:
```bash
# Create the database
createdb health_route_db
```

5. Start the server:
```bash
npm run dev
```

## API Endpoints

### POST /api/routes/optimize
Get optimized routes between two points.

Request body:
```json
{
  "startPoint": {
    "lat": 40.7128,
    "lng": -74.0060
  },
  "endPoint": {
    "lat": 40.7614,
    "lng": -73.9776
  },
  "mode": "walking"
}
```

### GET /api/routes/:id
Retrieve a specific route by ID.

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)
- `POSTGRES_*`: Database configuration
- `GRAPHHOPPER_API_KEY`: Your GraphHopper API key
- `OPENWEATHERMAP_API_KEY`: Your OpenWeatherMap API key

## Development

Run the development server:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

## License

MIT 