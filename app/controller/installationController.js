"use strict";

const controllerCommon = require('./common/controllerCommon');
const InstallationDao = require('../dao/installationDao');

class InstallationController {

    constructor() {
        this.common = new controllerCommon();
        this.instalDao = new InstallationDao();
    }

    getDepartement(res){
        this.instalDao.listdepartement()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    getVilles(res){
        this.instalDao.listville()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    getVillesId(req,res){
        this.instalDao.getVillesId(req.params.nomville)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = InstallationController;