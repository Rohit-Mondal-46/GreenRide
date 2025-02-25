const express = require('express');
const router = express.Router();
const { getOptimizedRoutes, getRouteById } = require('../services/routeService');
const { validateRouteRequest } = require('../middleware/validation');


// Get optimized routes between two points
router.post('/optimize', validateRouteRequest, async (req, res, next) => {
  try {
    const { startPoint, endPoint, mode } = req.body;
    
    // Validate required parameters
    if (!startPoint?.lat || !startPoint?.lng || !endPoint?.lat || !endPoint?.lng || !mode) {
      return res.status(400).json({ 
        error: 'Missing required parameters. Request body should include startPoint: {lat, lng}, endPoint: {lat, lng}, and mode.' 
      });
    }

    const routes = await getOptimizedRoutes(startPoint, endPoint, mode);
    res.json(routes);
  } catch (error) {
    next(error); 
  }
});

// Get cached route by ID
router.get('/route/:id', async (req, res, next) => {
  console.log('Route ID requested:', req.params.id);
  
  // Check if ID is numeric
  if (!/^\d+$/.test(req.params.id)) {
    console.log('Invalid ID format:', req.params.id);
    return res.status(400).json({ error: 'Invalid route ID. ID must be a number.' });
  }

  try {
    const id = parseInt(req.params.id, 10);
    console.log('Fetching route with ID:', id);
    
    const route = await getRouteById(id);
    if (!route) {
      console.log('Route not found for ID:', id);
      return res.status(404).json({ error: 'Route not found' });
    }
    
    console.log('Route found, sending response');
    res.json(route);
  } catch (error) {
    console.error('Error fetching route:', error);
    next(error);
  }
});

// Handle root route
router.get('/', (req, res) => {
  res.json({ message: 'Health Route API' });
});

// Handle 404 for routes
router.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router; 