'use strict';

exports.initialize = function(server, services) {

  // grab the services we need

  var userService = services.UserService,
      authService = services.AuthenticationService,
      cookieService = services.CookieService,
      cryptoService = services.CryptoService;


  // user: login
  // take username and password. return user object if login successful.

  server.post('/user/login', function(req, res, next) {
    userService.login(cryptoService, req.body.username, req.body.password).then(function(user) {
        authService.authenticateResponse(res, user, cookieService, cryptoService);
        res.send(200, user);
        next();
    }, function(error) {
        res.send(401, { 'error': error});
        next();
    });
  });

  // user
  // create a new user in the system
  // TODO: allow existing user to edit their profile

  server.post('/user', function(req, res, next) {
    console.log('create user with: ', req.body);
    userService.persist(cryptoService, req.body).then(function(user) {
        res.send(200, user);
        next();
    }, function(error) {
        res.send(401, { 'error': error});
        next();
    });
  });

};
