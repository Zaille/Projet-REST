const express = require('express');
const router = express.Router();

const EquipementsController = require('../../controller/equipementController');
const equipementsController = new EquipementsController();

module.exports = router;

router.get('', function (req, res) {
    equipementsController.getEquipements(res);
});

router.get('/:numequip', function (req, res) {
    equipementsController.getEquipementId(req,res);
});

router.get('/installation/:numinstal', function (req, res) {
    equipementsController.getEquipementparinstal(req,res);
});