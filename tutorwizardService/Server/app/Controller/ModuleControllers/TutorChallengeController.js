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

                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    function getChalengeForUser(clientId, unitId, callback) {
        return checkChallengeAlreadyDone(clientId, unitId, function(data) {

        })
    }

    function checkChallengeAlreadyDone(clientId, unitId, callback) {
        return Connection.query('')
    }
}