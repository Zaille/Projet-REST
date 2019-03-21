
const controllerCommon = require('./common/controllerCommon');
const InstallationDao = require('../dao/installationDao');

class InstallationController {

    constructor() {
        this.common = new controllerCommon();
        this.instalDao = new InstallationDao();
    }


    findById(req, res) {
        let id = req.params.id;

        this.carDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    findAll(res) {
        this.carDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    getDepartement(res){
        this.instalDao.listdepartement()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = InstallationController;