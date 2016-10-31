/**
 * Created by amila on 10/13/16.
 */
var Connection = require('../../../models/Connection');
var User = require('../UserController');

function ResourceController() {

    /*
     * send to client that resources are available for these catagories
     * @ studentId:- consumers id
     * @ unitId:- unit id that user needed
     * @res :- response that server need to send to client
     */
    this.availableResource = function(studentId, unitId, res) {
        User.validateUser(studentId, function(result) {
           if(result) {
               return getAvailableResourceCatagories(unitId, function(data) {
                   if(data) {
                       return res.send({'status':200, 'categories':data});
                   } else {
                       return res.send({'status': 500, 'message': 'not available resources for this catagory'});
                   }
               })
           } else {
               return res.send({'status': 404,'message':'permission denied'});
           }
        });
    }

    /*
     * get the resource information for requested category
     * @ studentId :- consumer id
     * @ unitId :- unit id that user needed
     * @ categoryId :- category id that user needed
     * @ res :- response that server need to send to client
     */
    this.getResourceForCategory = function(studentId, unitId, categoryId, res) {
        User.validateUser(studentId, function(result) {
            if (result) {
                return loadResourcesList(unitId, categoryId, function(data) {
                    if(data) {
                        return res.send({'status':200, 'resources':data});
                    } else {
                        return res.send({'status':500, 'message':'no resources available'});
                    }
                });
            } else {
                return res.send({'status': 404,'message':'permission denied'});
            }
        });
    }

    function getAvailableResourceCatagories(unitId, callback) {
        Connection.query('SELECT c.id, c.name '+
        'from resources r, resource_categorys c, resources_map_curriculums m '+
        'where m.unit_id='+unitId+' and c.id=r.category_id and r.id=m.resource_id '+
        'GROUP BY c.id', { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback(false);
            }
        })
    }

    function loadResourcesList(unitId, categoryId, callback) {
        Connection.query('SELECT r.* '+
        'from resources r, resources_map_curriculums m, resource_categorys c '+
        'where m.unit_id='+unitId+ ' and c.id='+categoryId+' and c.id=r.category_id and m.resource_id=r.id '+
        'group by r.id', { type: Connection.QueryTypes.SELECT}).then(function(data) {
            if(!data.length == 0) {
                return callback(data);
            } else {
                return callback(false);
            }
        })
    }
}

module.exports = new ResourceController();