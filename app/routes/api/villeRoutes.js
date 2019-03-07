/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const VilleController = require('../../controller/villeController');
const carController = new VilleController();

/**
 * Villes Entity routes
 */

// Recherche par ville
router.get('/:villeId', function (req, res) {
    carController.getVille(req, res);
});

// Recherche par département
router.get('/:departementId', function (req, res) {
    carController.getDepartement(req, res);
});

// Recherche une activité dans la ville
router.get('/:villeId/:activiyId', function (req, res) {
    carController.getActivityByVille(req, res);
});

// Recherche une activité dans le département
router.get('/:departementId/:activiyId', function (req, res) {
    carController.getAcivityByDepartement(req, res);
});

// Recherche d'equipements par ville
router.get('/:villeId/:stuffId', function (req, res) {
    carController.getVille(req, res);
});

// Recherche par département
router.get('/:departementId/:stuffId', function (req, res) {
    carController.getDepartement(req, res);
});

module.exports = router;