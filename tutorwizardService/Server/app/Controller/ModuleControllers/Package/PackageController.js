/**
 * Created by amila on 10/26/16.
 */
var Connection = require('../../../models/Connection');
var User = require('./../UserController');
var Subject = require('./../LearningZone/SubjectController');

function PackageController() {
    this.updatePackage = function(clientId, curriculumId, gradeId, res){
        return User.validateUser(clientId, function(paid) {
            if(paid) {
                return getPackageAvailable(curriculumId, gradeId, function(available) {
                    if (available) {
                        var packageDetails = {};
                        packageDetails.package = available[0].id;
                        packageDetails.grade = gradeId;
                        packageDetails.curriculum = curriculumId;
                        packageDetails.student = clientId;
                        return updatePackageDetails(packageDetails, function(result) {
                            if(result) {
                               return Subject.getAllAvailableSubjects(packageDetails.grade, function(subjects) {
                                   return res.send(subjects);
                               })
                            } else {
                                return res.send({'status': 500, 'message':'there is problem in server, please try again'});
                            }
                        })
                    } else {
                        return res.send({'status':500, 'message':'no packages are available'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    function getPackageAvailable(curriculumId, gradeId, callback) {
        return Connection.query('SELECT p.id '+
        'from packages p '+
        'where p.curriculum_id = '+curriculumId+' and p.grade_id='+gradeId+'', { type: Connection.QueryTypes.SELECT}).then(function(isPackageAvailable) {
            if (!isPackageAvailable.length == 0) {
                return callback(isPackageAvailable);
            } else {
                return callback(false);
            }
        })
    }

    function updatePackageDetails(packDetails, callback) {
        return Connection.query('UPDATE student_packages ' +
            'set `package_id`='+packDetails.package+', `grade_id`='+packDetails.grade+', curriculum_id='+packDetails.curriculum+' ' +
            'where `student_id`='+packDetails.student+'').then(function(data) {
                if(data) {
                    return callback(data);
                } else {
                    return callback(false);
                }
        })
    }
}

module.exports = new PackageController();