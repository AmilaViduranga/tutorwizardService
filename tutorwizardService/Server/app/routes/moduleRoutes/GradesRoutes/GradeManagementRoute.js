/**
 * Created by amila on 10/26/16.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var GradeController = ControllerMap.GradesController;

router.get('/:curriculumId', function(req, res, next) {
    GradeController.getGradesForParticularCurriculum(req.params.curriculumId, res);
});

module.exports = router;