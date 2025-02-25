const validateRouteRequest = (req, res, next) => {
  const { startPoint, endPoint, mode } = req.body;

  // Validate start point
  if (!startPoint || !startPoint.lat || !startPoint.lng) {
    return res.status(400).json({
      error: 'Invalid start point. Please provide latitude and longitude.'
    });
  }

  // Validate end point
  if (!endPoint || !endPoint.lat || !endPoint.lng) {
    return res.status(400).json({
      error: 'Invalid end point. Please provide latitude and longitude.'
    });
  }

  // Validate coordinates are within reasonable ranges
  if (startPoint.lat < -90 || startPoint.lat > 90 || 
      startPoint.lng < -180 || startPoint.lng > 180 ||
      endPoint.lat < -90 || endPoint.lat > 90 || 
      endPoint.lng < -180 || endPoint.lng > 180) {
    return res.status(400).json({
      error: 'Coordinates out of valid range'
    });
  }

  // Validate travel mode
  const validModes = ['walking', 'cycling', 'driving'];
  if (!mode || !validModes.includes(mode.toLowerCase())) {
    return res.status(400).json({
      error: 'Invalid mode. Must be one of: walking, cycling, driving'
    });
  }

  next();
};

module.exports = {
  validateRouteRequest
}; 