/**
 * Created by amila on 10/13/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function ModuleController() {

    /*
     * get the modules for given subject id
     * @ clientId :- consumers id
     * @ subjectId :- requested subject id
     * @ res :- response sent by server to client
     */
    this.get = function(clientId, subjectId, res) {
        User.validateUser(clientId, function(result) {
            if(result) {
                return getModules(subjectId, function(data) {
                    return res.send({'status' : 200, 'modules': data});
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    /*
     * get the modules for given subject id
     * @ subjectId :- requested subject
     * @ callback:- callback method
     */
    function getModules(subjectId, callback) {
        Connection.query('SELECT `module_id`,`module_name` FROM `modules` WHERE `subject_id`='+subjectId, { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback({'status': 500, 'message': 'not available'});
            }
        });
    }
}

module.exports = new ModuleController();