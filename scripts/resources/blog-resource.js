'use strict';

  var Extensions = require('./../helpers/extensions'),
      Promise = require('node-promise').Promise;
/*
 * Blog resource
 * Provide endpoints for managing blogs
 * TODO: add a prefilter to all requests for authentication.
 */

  exports.initialize = function(server, services) {

    var Context = {

      blogService : services.BlogService,
      userService : services.UserService,
      authService : services.AuthenticationService,
      cookieService : services.CookieService,
      cryptoService : services.CryptoService,


      getAuthenticatedUser : function(req, userService, authService, cookieService, cryptoService) {
          var promise = new Promise();
          authService.authenticateRequest(req, cookieService, cryptoService).then(function(token) {
              userService.find({'username' : token.username}).then(function(user) {
                  promise.resolve(user);
              }, function(error) {
                  promise.reject({'error': 'invalid user:' + error});
              });
          }, function(error) {
              promise.reject({'error': 'invalid token:' + error});
          });
          return promise;
      },

      postBlog : function (req, res, next) {
        var self = this;
        self.getAuthenticatedUser(req, self.userService, self.authService, self.cookieService, self.cryptoService).then(function(user) {
            self.blogService.persist(user, req.body).then(function(blog) {
                res.send(200, blog);
                next();
            });
        }, function(error) {
          res.send(401, error);
          next();
        });
      },

      getBlog : function(req, res, next) {
        var self = this;
        self.getAuthenticatedUser(req, self.userService, self.authService, self.cookieService, self.cryptoService).then(function(user) {
            self.blogService.get(user, req.params.id).then(function(blog) {
                res.send(200, blog);
                next();
            });
        }, function(error) {
          res.send(401, error);
          next();
        });
      },

      allBlogs : function(req, res, next) {
        var self = this;
        self.getAuthenticatedUser(req, self.userService, self.authService, self.cookieService, self.cryptoService).then(function(user) {
            self.blogService.all(user).then(function(blogs) {
                res.send(200, blogs);
                next();
            });
        }, function(error) {
          res.send(401, error);
          next();
        });
      }

    };

    /*
     * Bind service end points to methods
     */

    server.post('/blog', Extensions.bind(Context.postBlog, Context));
    server.get('/blog/:id', Extensions.bind(Context.getBlog, Context));
    server.get('/blogs', Extensions.bind(Context.allBlogs, Context));

    /*
     * Expose hidden methods for unit testing.
     */

    exports.__test__ = {
        // postBlog: this.extensions.bind(this.postBlog, this),
        // getBlog: this.extensions.bind(this.getBlog, this),
        // allBlogs: this.extensions.bind(this.allBlogs, this)
    };

  };
