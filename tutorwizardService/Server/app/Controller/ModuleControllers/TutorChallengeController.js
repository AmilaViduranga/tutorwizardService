/**
 * Created by amila on 10/14/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function TutorChallengeController() {
    this.getTutorChallenge = function(clientId, unitId, res) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                return getChalengeForUser(clientId, unitId, function(data) {
                    return res.send({'status': 200, 'tutorchallenge':data});
                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    this.getTutorChallengeAvailable = function(clientId, unitId, res) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                return challengeAvailable(unitId, function(data) {
                    if(!data.length == 0 && data) {
                        return res.send({'status':200, 'tutorchallenge':'available'});
                    } else {
                        return res.send({'status' :500, 'message': 'content are not available'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    function getChalengeForUser(clientId, unitId, callback) {
        return challengeAvailable(unitId, function(isavailable) {
            if (isavailable) {
                return challengeDone(clientId, isavailable, function(data) {
                    return callback(data);
                })
            } else {
                return callback({'status':500,'message':'content are not available'});
            }
        })
    }

    function challengeAvailable(unitId, callback) {
        return Connection.query('SELECT id,question,wordcount FROM `tutor_challenges` WHERE  `unit_id`='+unitId,{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(data.length > 0) {
                return callback(data);
            } else {
                return callback(false);
            }
        });
    }

    function challengeDone(clientId, data, callback) {
        return Connection.query('SELECT r.id, r.answers, t.wordcount FROM tutor_challenge_results r, tutor_challenges t WHERE r.student_id='+clientId+' and r.tutor_challenge_id='+data[0]['id']+' and r.tutor_challenge_id = t.id', { type: Connection.QueryTypes.SELECT}).then(function(availableData) {
            if (!availableData.length == 0) {
                return callback(availableData);
            } else {
                return callback(data);
            }
        })
    }
}

module.exports = new TutorChallengeController();