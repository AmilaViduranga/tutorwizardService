/**
 * Created by amila on 11/3/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var MessageController = ControllerMap.MessageController;

router.post('/:clientId/:subjectId', function(req, res, next) {
    MessageController.createMessage(req.params.clientId, req.body.message, req.params.subjectId, res);
});

router.get('/forsubject/:clientId/:subjectId', function(req, res, next) {
    MessageController.getMessageForSubject(req.params.clientId, req.params.subjectId, res);
});

router.get('/byid/:clientid/:messageid', function(req, res, next) {
    MessageController.getMessageById(req.params.clientid, req.params.messageid, res);
});

router.get('/sent/:clientid/:offsetvalue', function(req, res, next) {
    MessageController.loadSentMessagesChunkByChunk(req.params.clientid, req.params.offsetvalue, res);
});

router.get('/inbox/:clientid/:offsetvalue', function(req, res, next) {
    MessageController.loadInboxMessagesChunkByChunk(req.params.clientid, req.params.offsetvalue, res);
});

module.exports = router;