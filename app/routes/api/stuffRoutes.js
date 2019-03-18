/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const StuffController = require('../../controller/stuffController');
const stuffController = new StuffController();

/**
 * Stuff Entity routes
 */

// Recherche par équipements
router.get('/:stuffId', function (req, res) {
    stuffController.countAll(res);
});

// Recherche d'équipements par ville
router.get('/:stuffId/:villeId', function (req, res) {
    stuffController.countAll(res);
});

// Recherche d'équipements par département
router.get('/:stuffId/:departementId', function (req, res) {
    stuffController.countAll(res);
});

module.exports = router;