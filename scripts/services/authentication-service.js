'use strict';

(function(exports) {

  exports.name = "AuthenticationService";

  /*
   * Validate token
   */

  function tokenName() {
      return 'BloggerAuthenticationToken';
  }

  function validateToken(cryptoService, token) {
      return JSON.parse(cryptoService.decrypt(token)).name;
  }

  function generateToken(cryptoService, user) {
      return cryptoService.encrypt(JSON.stringify({ 'name' : user.name }));
  }

  /*
   * Authenticate request
   */

  exports.authenticateRequest = function(req, cookieService, cryptoService) {
      return validateToken(cryptoService, cookieService.readCookie(req, tokenName()));
  }

  /*
   * Authenticate future responses
   */

  exports.authenticateResponse = function(res, user, cookieService, cryptoService) {
      cookieService.writeCookie(res, tokenName(), generateToken(cryptoService, user));
  }

})(exports);
