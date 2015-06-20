'use strict';

var Mongoose = require('mongoose'),
    User = Mongoose.model('User'),
    Promise = require('node-promise').Promise;

exports.name = 'UserService';

/*
 * Find user with matching username and password,
 * Return that user object
 */

 function find (filter) {
   var promise = new Promise();
 	User.find(filter, function(err, users) {
 		if (err) {
       console.log(err.error);
       promise.resolve ({ success : false, error: err.error });
 		}
     if (users && users.length>0) {
       console.log('returning blogs');
       promise.resolve ({ success : true, content : users[0] });
     }
     promise.resolve({ success: false, error: 'no user found'});
 	});
   return promise;
 }

exports.find = find;

exports.login = function(cryptoService, username, password) {
  return find({
      'username': username,
      'password': cryptoService.encrypt(password)
    });
};

exports.persist = function(cryptoService, model) {
  var promise = new Promise();
	var user = new User(model || {});

  if (user._id) {
      promise.resolve({ success : false, error : 'cannot yet edit existing user:' + user._id});
      return promise;
  }

  user.password = cryptoService.encrypt(user.password);

	user.save(function(err) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : user });
	});
  return promise;
};
