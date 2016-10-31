/**
 * Created by amila on 10/26/16.
 */
var Connection = require('../../../models/Connection');

function CurriculumController() {
    this.getCurriculums = function(res) {
        return Connection.query('SELECT * FROM `curriculums`', { type: Connection.QueryTypes.SELECT}).then(function(curriculums) {
            if(!curriculums.length == 0) {
                return res.send({'status': 200, 'curriculums': curriculums});
            } else {
                return res.send({'status': 500, 'message': 'no curriculums available'});
            }
        });
    }
}

module.exports = new CurriculumController();