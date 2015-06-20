'use strict';

var Mongoose = require('mongoose'),
    Blog = Mongoose.model('Blog'),
    Promise = require('node-promise').Promise;

exports.name = 'BlogService';

exports.all = function(user) {
  var promise = new Promise();
	Blog.find({ userId : user._id }, function(err, blogs) {
		if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    console.log('returning blogs');
    promise.resolve ({ success : true, content : blogs });
	});
  return promise;
};

exports.get = function(user, id) {
  var promise = new Promise();
	Blog.find({ userId : user._id,  _id : id }, function(err, blogs) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : blogs });
	});
  return promise;
};

exports.persist = function(user, model) {
  var promise = new Promise();
	var blog = new Blog(model || {});

  if (blog._id && blog.userId !== user._id) {
      promise.resolve({ success : false, error : 'blog belongs to different user'});
      return promise;
  }

  blog.userId = user._id;
	blog.save(function(err) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : blog });
	});
  return promise;
};

exports.delete = function(user, id) {
  var promise = new Promise();
	Blog.remove({ _id: id }, function (err) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : id });
	});
  return promise;
};
