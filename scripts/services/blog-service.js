'use strict';

var Mongoose = require('mongoose'),
    Blog = Mongoose.model('Blog'),
    Promise = require('node-promise').Promise;

exports.name = 'BlogService';

exports.all = function(user) {
  var promise = new Promise();
	Blog.find({ userId : user._id }, function(err, blogs) {
		if(err) {
      return promise.reject (err.error);
		}
    promise.resolve (blogs);
	});
  return promise;
};

exports.published = function(user) {
  var promise = new Promise();
	Blog.find({ userId : user._id, published : true }, function(err, blogs) {
		if(err) {
      return promise.reject (err.error);
		}
    promise.resolve (blogs);
	});
  return promise;
};


exports.get = function(user, id) {
  var promise = new Promise();
	Blog.find({ userId : user._id,  _id : id }, function(err, blogs) {
    if(err) {
      return promise.reject (err.error);
		}
    promise.resolve (blogs);
	});
  return promise;
};

exports.persist = function(user, model) {
  var promise = new Promise();
	var blog = new Blog(model || {});

  if (blog._id && blog.userId && blog.userId !== user._id) {
      promise.reject('blog belongs to different user');
      return promise;
  }

  blog.userId = user._id;
	blog.save(function(err) {
      if(err) {
          console.log(err.error);
          return promise.reject (err.error);
  		}
      promise.resolve (blog);
	});

  return promise;
};

exports.delete = function(user, id) {
  var promise = new Promise();
	Blog.remove({ _id: id }, function (err) {
      if(err) {
          return promise.reject (err.error);
  		}
      promise.resolve ({ success : true, content : id });
	});
  return promise;
};
