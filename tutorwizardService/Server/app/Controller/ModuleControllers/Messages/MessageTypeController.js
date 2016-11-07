/**
 * Created by amila on 11/3/16.
 */
var Connection = require('../../../models/Connection');

function MessageTypeController() {
    this.getAllTypes = function(clientId, res) {
        return getStudentGrade(clientId, function(grade) {
            return getAvalableSentTypes(grade, function(data) {
                 return res.send({'status': 200,'data': data});
            });
        });
    }

    /*
     * get the grade of the valid student
     * @ studentId :- the id of the student needed to get
     * @ callback :- the callback method
     */
    function getStudentGrade(studentId, callback) {
        Connection.query('SELECT `grade_id` FROM `student_packages` WHERE `student_id`='+studentId, { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data[0]['grade_id']);
            } else {
                return callback(false);
            }
        });
    }

    function getAvalableSentTypes(studentGrade, callback) {
        Connection.query('SELECT t.* '+
        'FROM messages_sent ms, subjects s, message_types t '+
        'WHERE s.subject_id=ms.subject_id and t.id=ms.type_id and s.grade_id='+studentGrade+'', { type: Connection.QueryTypes.SELECT}).then(function(data) {
            var sentTypes = data;
            return Connection.query('SELECT * FROM message_types WHERE common=true',{type: Connection.QueryTypes.SELECT}).then(function(data) {
                sentTypes.push(data);
                return callback(sentTypes);
            });
        })
    }

}

module.exports = new MessageTypeController();