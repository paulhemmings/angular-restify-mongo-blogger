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
    var loginParams = JSON.parse(req.body);
    userService.login(cryptoService, loginParams.username, loginParams.password).then(function(data) {
        authService.authenticateResponse(res, cookieService, cryptoService);
        res.send(data);
        next();
    });
  });

  // user
  // create a new user in the system
  // TODO: allow existing user to edit their profile

  server.post('/user', function(req, res, next) {
    userService.persist(cryptoService, req.body).then(function(data) {
        res.send(data);
        next();
    });
  });

};
