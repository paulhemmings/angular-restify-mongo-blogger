var Mongoose = require('mongoose'),
    Blog = Mongoose.model('Blog'),
    Promise = require("node-promise").Promise;

exports.name = "BlogService";

exports.all = function() {
  var promise = new Promise();
	Blog.find(function(err, blogs) {
		if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    console.log("returning blogs");
    promise.resolve ({ success : true, content : blogs });
	});
  return promise;
};

exports.get = function(id) {
  var promise = new Promise();
	Blog.find({ _id : id }, function(err, blogs) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : blogs });
	});
  return promise;
};

exports.persist = function(model) {
  var promise = new Promise();
	var blog = new Blog(model || {});
	blog.save(function(err) {
    if(err) {
      console.log(err.error);
      promise.resolve ({ success : false, error: err.error });
		}
    promise.resolve ({ success : true, content : blog });
	});
  return promise;
};

exports.delete = function(id) {
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
