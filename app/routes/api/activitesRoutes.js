const express = require('express');
const router = express.Router();

const ActivitesController = require('../../controller/activiteController');
const activitesController = new ActivitesController();

module.exports = router;

router.get('/test', function (req, res) {
    activitesController.getActivites(res);
});
