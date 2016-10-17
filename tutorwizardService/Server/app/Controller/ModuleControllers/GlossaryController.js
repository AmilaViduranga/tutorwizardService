/**
 * Created by amila on 10/14/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function GlossaryController() {
    this.getGlossary = function(clientId, res) {
        User.validateUser(clientId, function(result) {
            if(result) {
                return getAllGlossaryContents(function(data) {
                    if(data) {
                        return res.send({'status':200,'glossary':data});
                    } else {
                        return res.send({'status':500, 'message':'no glossary available'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    function getAllGlossaryContents(callback) {
        Connection.query('SELECT `word`,`meaning` FROM `glossarys`', { type: Connection.QueryTypes.SELECT}).then(function(data) {
           if(!data.length == 0) {
               return callback(data);
           } else {
               return callback(false);
           }
        });
    }
}

module.exports = new GlossaryController();