/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/**API routes **/
/*
router.use('/activite', require('./api/activiteRoutes'));
router.use('/equipement', require('./api/equipementRoutes'));
*/
router.use('/installation', require('./api/installationRoutes'));
module.exports = router;