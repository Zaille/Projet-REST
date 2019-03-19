/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/ville', require('./api/villeRoutes'));
router.use('/installation', require('./api/i'))
module.exports = router;