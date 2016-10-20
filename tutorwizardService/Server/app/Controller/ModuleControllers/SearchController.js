/**
 * Created by amila on 10/18/16.
 */
var Connection = require('../../models/Connection');
var User = require('./UserController');

function SearchController() {
    this.search = function(clientId, subjectId, word, res) {
        return User.validateUser(clientId, function(result) {
            if(result) {
                var modules = {};
                return getSerchContentModules(subjectId, word, function(result) {
                    modules = result;
                    return getSearchUnits(subjectId, word, function(units) {
                        return res.send({
                            'status': 200,
                            'modules': modules,
                            'units': units
                        });
                    });
                });
            } else {
                return res.send({'message':'permission denied'});
            }
        })
    }

    function getSerchContentModules(subjectId, word, callback) {
        return Connection.query('SELECT * '+
        'from modules m '+
        'where m.subject_id = '+subjectId+' and m.module_name like "%'+word+'%"',{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            return callback(data);
        })
    }

    function getSearchUnits(subjectid, word, callback) {
        return Connection.query('SELECT u.* '+
        'from subjects s, modules m, units u '+
        'where s.subject_id = '+subjectid+' and s.subject_id=m.subject_id and m.module_id=u.module_id and u.unit_name LIKE "%'+word+'%"',{ type: Connection.QueryTypes.SELECT}).then(function(data) {
            return callback(data);
        });
    }
}

module.exports = new SearchController();