'use strict';

exports.initialize = function(server, services) {

  // grab the services we need

  var userService = services.UserService,
      authService = services.AuthenticationService,
      cookieService = services.CookieService,
      cryptoService = services.CryptoService;


  // user: login
  // take username and password. return user name if login successful.
  // includes authentication token in response (as cookie)

  server.post('/user/login', function(req, res, next) {
    userService.login(cryptoService, req.body.username, req.body.password).then(function(user) {
        authService.authenticateResponse(res, user, cookieService, cryptoService);
        res.send(200, { 'username' : user.username });
        next();
    }, function(error) {
        res.send(401, { 'error': error});
        next();
    });
  });

  // user: create
  // create a new user in the system. returns username if suucessful.
  // TODO: allow existing user to edit their profile
  // includes authentication token in response (as cookie)

  server.post('/user', function(req, res, next) {
    userService.persist(cryptoService, req.body).then(function(user) {
        authService.authenticateResponse(res, user, cookieService, cryptoService);
        res.send(200, { 'username' : user.username });
        next();
    }, function(error) {
        res.send(401, { 'error': error});
        next();
    });
  });

  // user: retrieve

  server.get('/user', function(req, res, next) {
      authService.authenticateRequest(req, cookieService, cryptoService).then(function(token) {
          userService.find({'username' : token.username}).then(function(user) {
            res.send(200, { 'username' : user.username });
            next();
          }, function(error) {
              res.send(401, { 'error': 'invalid user:' + error});
              next();
          });
      }, function(error) {
          res.send(401, { 'error': 'invalid token:' + error});
          next();
      });
  });

};
