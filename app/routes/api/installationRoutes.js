const express = require('express');
const router = express.Router();


const InstallationController = require('../../controller/installationController');
const installationController = new InstallationController();


module.exports = router;

router.get('/departement', function (req, res) {
    installationController.getDepartement(res);
});

router.get('/departement/:codedep', function (req, res) {
    installationController.getDepartementId(req,res);
});

router.get('/ville', function (req, res) {
    installationController.getVilles(res);
});

router.get('/ville/:nomville', function (req, res) {
    installationController.getVillesId(req,res);
});

