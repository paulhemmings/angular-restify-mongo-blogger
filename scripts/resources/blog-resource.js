'use strict';

/*
 * Blog resource
 * Provide endpoints for managing blogs
 * TODO: add a prefilter to all requests for authentication.
 */

  exports.initialize = function(server, services) {

    var blogService = services.BlogService,
        userService = services.UserService,
        authService = services.AuthenticationService,
        cookieService = services.CookieService,
        cryptoService = services.CryptoService,
        extensions = require('./../helpers/extensions'),

        getAuthenticatedUser = function(req, userService, authService, cookieService, cryptoService) {
           var name = authService.authenticateRequest(req, cookieService, cryptoService);
           return userService.find({ 'name' : name});
        },

        postBlog = function (req, res, next) {
          getAuthenticatedUser(req, userService, authService, cookieService, cryptoService).then(function(response) {
              console.log('post a new blog to the store');
              if (response.success) {
                  blogService.persist(response.content, req.body).then(function(data) {
                      res.send(data);
                      next();
                  });
              }
          });
        },

        getBlog = function(req, res, next) {
          getAuthenticatedUser(req, userService, authService, cookieService, cryptoService).then(function(response) {
              if (response.success) {
                  blogService.get(response.content, req.params.id).then(function(data) {
                      res.send(data);
                      next();
                  });
              }
          });
        },

        allBlogs = function(req, res, next) {
          getAuthenticatedUser(req, userService, authService, cookieService, cryptoService).then(function(response) {
              if (response.success) {
                  blogService.all(response.content).then(function(data) {
                      if (data.success && data.content.length === 0) {
                          blogService.persist(response.content, { title: 'test-data', content: 'test-content' });
                      }
                      res.send(data);
                      next();
                  });
              }
          });
        };

    /*
     * Bind service end points to methods
     */

    server.post('/blog', extensions.bind(postBlog, this));
    server.get('/blog/:id', extensions.bind(getBlog, this));
    server.get('/blogs', extensions.bind(allBlogs, this));

    /*
     * Expose hidden methods for unit testing.
     */

    exports.__test__ = {
        // postBlog: this.extensions.bind(this.postBlog, this),
        // getBlog: this.extensions.bind(this.getBlog, this),
        // allBlogs: this.extensions.bind(this.allBlogs, this)
    };

  };
