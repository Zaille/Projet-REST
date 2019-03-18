/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/ville', require('./api/villeRoutes'));
router.use('/acitivty', require('./api/activityRoutes'));

module.exports = router;