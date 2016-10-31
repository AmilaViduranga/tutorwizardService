/**
 * Created by amila on 10/26/16.
 */
var Connection = require('../../../models/Connection');

function GradeController() {
    this.getGradesForParticularCurriculum = function(curriculumId, res) {
        return Connection.query('SELECT id, name '+
        'from grades g '+
        'where g.curriculum_id = '+curriculumId+'', { type: Connection.QueryTypes.SELECT}).then(function(grades) {
            if (!grades.length == 0) {
                return res.send({'status': 200, 'grades': grades});
            } else {
                return res.send({'status':500, 'message': 'no grades available'});
            }
        });
    }
}

module.exports = new GradeController();