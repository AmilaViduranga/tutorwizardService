/**
 * Created by User on 9/18/2016.
 * Developer :- Amila
 */

var Promise = require('bluebird');
var Connection = require('../../models/Connection');

function UserController() {
    /*
     * check if the valid user make the request
     * @ client id:- id of the client
     * @ callback :- callback method to return value
     */
    this.validateUser = function(clientId, callback) {
        Connection.query('SELECT `status` FROM `users` WHERE id='+clientId,{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            if (data[0]['status'] == 1) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    this.paymentValidationService = function(clientId, res) {
        return this.validateUser(clientId, function(state) {
            return res.send(
                {
                    'state':200,
                    'valid':state
                }
            );
        });
    }

    this.getBasicStudentDetails = function(clientId, callback) {
        return this.isUserStudent(clientId, function(data) {
            if(data) {
                return Connection.query('SELECT s.first_name,s.family_name,s.id '+
                'from students s '+
                'where s.users_id='+clientId).then(function(response) {
                    return callback(response);
                })
            } else {
                return callback({'status': 404, 'message': 'user is not a student'});
            }
        })
    }

    this.getGrade = function(clientID, callback) {
        return Connection.query('SELECT g.name '+
        'FROM student_packages p, grades g '+
        'where p.student_id='+clientID+' and p.grade_id=g.id', { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback(false);
            }
        })
    }

    this.isUserStudent = function(clientId,callback) {
        return Connection.query('select `id` FROM `students` WHERE users_id='+clientId,{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(true);
            } else {
                return callback(false);
            }
        })
    }
    // this.validateUser = function(clientId) {
    //     return new Promise(function(resolve, reject) {
    //         Connection.query('SELECT `status` FROM `users` WHERE id='+clientId,{ type: Connection.QueryTypes.SELECT}).then(function(data) {
    //             if (data[0]['status'] == 1) {
    //                 resolve(true);
    //             } else {
    //                 resolve(false);
    //             }
    //         }, function(err) {
    //             reject(err);
    //         });
    //     });
    //
    // }

}

module.exports = new UserController();