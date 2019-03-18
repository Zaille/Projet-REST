/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ActivityController = require('../../controller/activityController');
const activityController = new ActivityController();

/**
 * Activity Entity routes
 */

// Recherche par activité
router.get('/:activityId', function (req, res) {
    activityController.countAll(res);
});

// Recherche d'un nombre d'équipements par activité
router.get('/:activityId/:StuffId', function (req, res) {
    activityController.countAll(res);
});

module.exports = router;