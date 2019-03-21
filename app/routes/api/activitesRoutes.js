const express = require('express');
const router = express.Router();

const ActivitesController = require('../../controller/activiteController');
const activitesController = new ActivitesController();

module.exports = router;

router.get('', function (req, res) {
    activitesController.getActivites(res);
});

router.get('/:codeactivity', function (req, res) {
    activitesController.getActiviteId(req,res);
});
