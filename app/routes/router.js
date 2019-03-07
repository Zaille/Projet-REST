/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/car', require('./api/villeRoutes'));
router.use('/driver', require('./api/activityRoutes'));

module.exports = router;