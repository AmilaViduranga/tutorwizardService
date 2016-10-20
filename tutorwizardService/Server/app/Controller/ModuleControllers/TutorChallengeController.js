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

    this.addAnswerForChallenge = function (clientId,data) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                var tutorInstance = {};
                tutorInstance.tutor_challenge_id = data.challenge_id;
                tutorInstance.student_id = clientId;
                tutorInstance.answers = data.answers;
                return addAnswer(tutorInstance, function(data) {
                   if (data) {
                       return res.send({'status':200, 'message':'successfully inserted challenge'});
                   } else {
                       return res.send({'status':500, 'message':'error going on, please try it again'});
                   }
                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    this.updateAnswerForChallenge = function (clientId, data) {
        return User.validateUser(clientId, function(result) {
            if(result) {
                var tutorInstance = {};
                tutorInstance.tutor_challenge_id = data.challenge_id;
                tutorInstance.answers = data.answers;
                return updateAnswer(tutorInstance, function(data) {
                    if (data) {
                        return res.send({'status':200, 'message':'successfully updated challenge'});
                    } else {
                        return res.send({'status':500, 'message':'error going on, please try it again'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    function updateAnswer(tutorInstance, callback) {
        return Connection.query('UPDATE tutor_challenges SET answer='+tutorInstance.answers+' where id='+tutorInstance.tutor_challenge_id).then(function(data) {
            if(data) {
                return callback(true);
            } else {
                return callback(false);
            }
        });
    }

    function addAnswer(tutorInstance, callback) {
        return Connection.query('INSERT INTO tutor_challenge_results(tutor_challenge_id, student_id, answers) VALUES ('+tutorInstance.tutor_challenge_id+','+tutorInstance.student_id+','+tutorInstance.answers+')').then(function(data) {
            if (data) {
                return callback(true);
            } else {
                return callback(false);
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