'use strict';

(function(exports) {

  var Promise = require('node-promise').Promise;

  exports.name = 'AuthenticationService';

  /*
   * Validate token
   */

  function tokenName() {
      return 'BloggerAuthenticationToken';
  }

  function retrieveToken(cryptoService, cookie) {
      return (!cookie) ? undefined : JSON.parse(cryptoService.decrypt(cookie));
  }

  function generateToken(cryptoService, user) {
      return cryptoService.encrypt(JSON.stringify({ 'name' : user.name }));
  }

  /*
   * Authenticate request
   */

  exports.authenticateRequest = function(req, cookieService, cryptoService) {
      var promise = new Promise();
      var token = retrieveToken(cryptoService, cookieService.readCookie(req, tokenName()));
      if (token && token.name !== undefined) {
          promise.resolve({ success : true, content : token });
      } else {
          promise.reject({ success : false, error : 'invalid token'});
      }
      return promise;
  };

  /*
   * Authenticate future responses
   */

  exports.authenticateResponse = function(res, user, cookieService, cryptoService) {
      var promise = new Promise();
      var token = generateToken(cryptoService, user);
      cookieService.writeCookie(res, tokenName(), token);
      promise.resolve({ success : true, content : token });
      return promise;
  };

})(exports);
