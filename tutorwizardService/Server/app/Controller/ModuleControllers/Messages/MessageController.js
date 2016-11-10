/**
 * Created by amila on 11/3/16.
 */
var Connection = require('../../../models/Connection');
var User = require('../UserController');

function  MessageController() {

    /*
     * message create for particular subject
     * @clientId :- user id
     * @subjectId :- id of the subject
     * @res :- response
     */
    this.createMessage = function(clientId, messageContent, subjectId, res) {
        return User.validateUser(clientId, function(data) {
            if (data) {
                messageContent = JSON.parse(messageContent);
                return addMessage(messageContent,clientId, subjectId, function(response) {
                    if(response) {
                        if(messageContent.resource_id) {
                            return addMessageResource(response, messageContent.resource_id, function(isAddResource) {
                                if(isAddResource) {
                                    return res.send({'status':200, 'message':'Message insert Properly'});
                                } else {
                                    return res.send({'status':500, 'message':'Message insert but resource not inserted well'});
                                }
                            })
                        } else {
                            return res.send({'status':200, 'message':'Message insert Properly'});
                        }
                    } else {
                        return res.send({'status':500, 'message':'Message not insert Properly'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    /*
     * get the message for particular subject
     */
    this.getMessageForSubject = function(clientId, subjectId, res) {
        return User.validateUser(clientId, function(status) {
            if(status) {
                return Connection.query('SELECT id,title,sent_to, seen,sent_date FROM messages WHERE user_id='+clientId+' and subject_id='+subjectId+'',{ type: Connection.QueryTypes.SELECT}).then(function(data) {
                    if(!data.length == 0) {
                        return res.send({'status':200,'messages':data});
                    } else {
                        return res.send({'status':500, 'message':'No messages for particular subject'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    function addMessage(messageContent, clientId, subjectId, callback) {
        var datetime = Date.parse(new Date());
        return Connection.query('INSERT INTO `messages`(`title`, `message`, `sent_to`, `seen`, `sent_date`, `user_id`, `subject_id`) ' +
            'VALUES ("'+messageContent.title+'","'+messageContent.message+'",'+messageContent.type_id+',false,"'+datetime+'",'+clientId+','+subjectId+')',{ type: Connection.QueryTypes.INSERT}).then(function(data) {
                if (!data) {
                    return callback(false);
                } else if(data) {
                    return callback(data);
                }
        });
    }

    function addMessageResource(messageId, resourceId, callback) {
        return Connection.query('INSERT INTO `message_resources`(`message_id`, `resource_id`) VALUES ('+messageId+','+resourceId+')').then(function(data) {
            if(!data) {
                return callback(false);
            } else if(data) {
                return callback(true);
            }
        })
    }

    this.getMessageById = function(clientId, messageId, res) {
        return User.validateUser(clientId, function (result) {
            if (result) {
                return Connection.query('SELECT message FROM messages WHERE id='+messageId, {type: Connection.QueryTypes.SELECT}).then(function(data) {
                    if(!data.length == 0) {
                        return res.send({'status': 200, 'messagecontent':data});
                    } else {
                        return res.send({'status':500, 'message':'No messages content'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        })
    }

    this.loadSentMessagesChunkByChunk = function(clientId, offsetValue, res) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                return Connection.query('SELECT id,title,message,sent_to,seen,sent_date FROM messages LIMIT 5 OFFSET '+offsetValue+'',{type: Connection.QueryTypes.SELECT}).then(function(data) {
                    if(!data.length == 0) {
                        return res.send({'status': 200, 'messages': data});
                    } else {
                        return res.send({'status':500, 'message':'No messages available'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }

    this.loadInboxMessagesChunkByChunk = function(clientId, offsetValue, res) {
        return User.validateUser(clientId, function(result) {
            if (result) {
                return Connection.query('SELECT id,title,reply,sent_to,seen,reply_date FROM messages LIMIT 5 OFFSET '+offsetValue+'',{type: Connection.QueryTypes.SELECT}).then(function(data) {
                    if(!data.length == 0) {
                        return res.send({'status': 200, 'messages': data});
                    } else {
                        return res.send({'status':500, 'message':'No messages available'});
                    }
                })
            } else {
                return res.send({'status':404, 'message':'Permission Denied'});
            }
        });
    }
}

module.exports = new MessageController();