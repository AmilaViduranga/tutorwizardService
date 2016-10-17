/**
 * Created by amila on 10/14/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../Controller/ControllerMap');

var GlossaryController = ControllerMap.GlossaryController;

router.get('/:id', function(req, res, next) {
    GlossaryController.getGlossary(req.params.id, res);
});

module.exports = router;