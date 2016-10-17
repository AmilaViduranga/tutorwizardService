/**
 * Created by amila on 10/17/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var TutorChallengeController = ControllerMap.TutorChallengeController;

router.get('/available/:id/:unitId', function(req, res, next) {
    TutorChallengeController.getTutorChallengeAvailable(req.params.id, req.params.unitId, res);
});

router.get('/getchallenge/:id/:unitId', function(req, res, next) {
    TutorChallengeController.getTutorChallenge(req.params.id, req.params.unitId, res);
});

module.exports = router;