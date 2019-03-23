"use strict";

const controllerCommon = require('./common/controllerCommon');
const EquipementDao = require('../dao/equipementDao');

class EquipementsController {

    constructor() {
        this.common = new controllerCommon();
        this.equipDao = new EquipementDao();
    }

    getEquipements(res){
        this.equipDao.listEquipements()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

    getEquipementId(req,res){
        this.equipDao.getEquipementId(req.params.numequip)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
    getEquipementparinstal(req,res){
        this.equipDao.getEquipementparinstal(req.params.numinstal)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }
}

module.exports = EquipementsController;