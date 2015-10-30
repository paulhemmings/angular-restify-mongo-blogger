'use strict';

var Mongoose = require('mongoose'),
    Blog = Mongoose.model('Blog'),
    Promise = require('node-promise').Promise,
    curry = require('curry');

var handler = curry(function(promise, err, response) {
    if(err) {
        console.log('saving failed with ', err);
        return promise.reject (err);
    }
    promise.resolve (response);
});

exports.name = 'BlogService';

exports.all = function(user) {
    var promise = new Promise();
  	Blog.find({ userId : user._id }, handler(promise));
    return promise;
};

exports.published = function(user) {
    var promise = new Promise();
  	Blog.find({ userId : user._id, published : true }, handler(promise));
    return promise;
};


exports.get = function(user, id) {
    var promise = new Promise();
  	Blog.find({ userId : user._id,  _id : id }, handler(promise));
    return promise;
};

exports.persist = function(user, model) {
    var promise = new Promise();
  	var blog = new Blog(model || {});

    if (blog._id && blog.userId) {
        if (String(blog.userId) != String(user._id)) {
            console.log("no match", blog.userId, user._id);
            return promise.reject('blog belongs to different user');
        }
    }

    console.log('updating blog', blog._id);
    var upsertData = blog.toObject();
    upsertData.userId = user._id;
		delete upsertData._id;
		Blog.update({ _id : blog._id }, upsertData, {upsert: true}, handler(promise));

    return promise;
};

exports.delete = function(user, id) {
    var promise = new Promise();
  	Blog.remove({ _id: id }, function (err) {
        if(err) {
            return promise.reject (err);
    		}
        promise.resolve ({ success : true, content : id });
  	});
    return promise;
};
