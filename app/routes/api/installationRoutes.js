const express = require('express');
const router = express.Router();


const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();


module.exports = router;

router.get('/departement', function (req, res) {
    installationController.getDepartement(res);
});

router.get('/ville', function (req, res) {
    installationController.getVilles(res);
});

