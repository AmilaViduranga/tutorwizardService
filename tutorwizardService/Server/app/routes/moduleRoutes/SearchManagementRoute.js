/**
 * Created by amila on 10/20/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var SearchController = ControllerMap.SearchController;

router.get('/:id/:subjectId/:word', function(req, res, next) {
    SearchController.search(req.params.id, req.params.subjectId, req.params.word, res);
});

module.exports = router;