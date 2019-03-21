
const controllerCommon = require('./common/controllerCommon');
const ActivitesDao = require('../dao/activiteDao');

class ActivitesController {

    constructor() {
        this.common = new controllerCommon();
        this.activDao = new ActivitesDao();
    }

    getActivites(res){
        this.activDao.listActivites()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    }

}

module.exports = ActivitesController;