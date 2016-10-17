/**
 * Created by amila on 10/12/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function subjectController() {

    /*
     * send the subject for valid user
     * @ studentId :- the student id send by the client
     * @res :- response that needed to set by server to client
     */
    this.get = function(studentId, res) {
        User.validateUser(studentId, function(result) {
            if (result) {
                getStudentGrade(studentId, function(studentGrade) {
                    if (studentGrade) {
                        return getAllAvailableSubjects(studentGrade, function(data) {
                            res.send(data);
                        });
                    }
                });
            } else {
                return res.send({'message':'permission denied'});
            }
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

    /*
     * get the available subject for particular student
     * @ studentGrade :- the grade of the student
     * @ callback :- the callback method
     */
    function getAllAvailableSubjects(studentGrade, callback) {
        Connection.query('SELECT `subject_id`,`subject_name` FROM `subjects` WHERE `grade_id`='+studentGrade, { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback({'message' : 'no subjects available'});
            }
        })
    }
}

module.exports = new subjectController();