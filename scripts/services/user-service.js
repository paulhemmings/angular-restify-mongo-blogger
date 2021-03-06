'use strict';

var Mongoose = require('mongoose'),
    User = Mongoose.model('User'),
    Promise = require('node-promise').Promise,
    curry = require('curry');

var handler = curry(function(promise, err, response) {
    if(err) {
        console.log('saving failed with ', err);
        return promise.reject (err);
    }
    promise.resolve (response);
});

exports.name = 'UserService';

/*
 * Find user with matching username and password,
 * Return that user object
 */

 function findUser (filter) {
     var promise = new Promise();
   	 User.find(filter, function(err, users) {

        if (err) {
           return promise.reject (err.error);
     		}

        if (!users || users.length===0) {
            return promise.reject ('no user found');
        }

        promise.resolve (users[0]);

   	});
    return promise;
 }

exports.find = findUser;

exports.login = function(cryptoService, username, password) {
  return findUser({
      'username': username,
      'password': cryptoService.encrypt(password)
    });
};

exports.all = function(user) {
    var promise = new Promise();
  	User.find({ }, handler(promise));
    return promise;
};

exports.persist = function(cryptoService, model) {
    var promise = new Promise();

    if (model._id) {
        promise.reject ('cannot yet edit existing user');
        return promise;
    }

  	var user = new User(model || {});
    user.password = cryptoService.encrypt(user.password);
  	user.save(handler(promise));

    return promise;
};
