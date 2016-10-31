/**
 * Created by amila on 10/13/16.
 */
var Connection = require('../../../models/Connection');
var User = require('../UserController');

function UnitController() {
    /*
     * get the units for given subject id
     * @ clientId :- consumers id
     * @ moduleId :- requested module id
     * @ res :- response sent by server to client
     */
    this.get = function(clientId, moduleId, res) {
        User.validateUser(clientId, function(result) {
            if(result) {
                return getUnits(moduleId, function(data) {
                    return res.send({'status' : 200, 'units': data});
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    /*
     * get the units for given module id
     * @ moduleId :- requested module id
     * @ callback:- callback method
     */
    function getUnits(moduleId, callback) {
        Connection.query('SELECT `unit_id`,`unit_name`, `module_id` FROM `units` WHERE `module_id`='+moduleId, { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback({'status': 500, 'message': 'not available'});
            }
        });
    }
}

module.exports = new UnitController();