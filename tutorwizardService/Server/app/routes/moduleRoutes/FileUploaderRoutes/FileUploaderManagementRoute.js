/**
 * Created by EDI-DELL-01 on 11/10/2016.
 */
var express = require('express');
var router = express.Router();
var ControllerMap = require('../../../Controller/ControllerMap');

var FileUploader = ControllerMap.FileUploader;

router.post('/profile/:id', function (req, res,next) {
    if(req.files.profile) {
        FileUploader.profileUploader(req.params.id, req.files.profile, res);
    } else {
        res.send({'status': 404, 'message': 'profile is not uploaded properly, please try it again'});
    }
});

router.get('/profile/:id', function(req, res, next) {
    FileUploader.getProfile(req.params.id, res);
})

module.exports = router;