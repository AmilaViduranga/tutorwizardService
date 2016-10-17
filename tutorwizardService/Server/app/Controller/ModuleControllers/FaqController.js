/**
 * Created by amila on 10/14/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function FaqController() {
    this.getAllFaq = function(clientId, unitId, res) {
        return User.validateUser(clientId, function(result) {
            if(result) {
                return getFaqForUnit(unitId, function(data) {
                   if(data) {
                       return res.send({'status': 200, 'faqs': data});
                   } else {
                       return res.send({'status':500, 'message':'no faqs available'});
                   }
                });
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    function getFaqForUnit(unitId, callback) {
        return Connection.query('SELECT `question`, `answer` FROM `faqs` WHERE `unit_id`='+unitId, { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback(false);
            }
        })
    }
}

module.exports = new FaqController();