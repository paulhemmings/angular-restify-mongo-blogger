var authService = require('./../../../scripts/services/authentication-service');

describe("Authentication Service suite", function() {

	beforeEach(function() {
	});

	it("should authenticate a request", function() {
    var req = {},
        cookieService = {
          readContent : function(req, name) {
            return "cookie-token"
          }
        },
        cryptoService = {
          decrypt : function(value) {
            return '{ "name": "paul"}'
          }
        };

		expect(authService.authenticateRequest(req, cookieService, cryptoService)).toBe('paul');

	});

  it("should authenticate a response", function() {

    var user = { "name" : "paul"};
    var cookieService = {
          writeCookie : function(res, token, content) {
            expect(content).toBe("encrypted");
          }
    };
    var cryptoService = {
      encrypt : function(content) {
        expect(content).toBe('{"name":"paul"}');
        return "encrypted";
      }
    };
    var res = {};

    expect(authService.authenticateResponse(res, user, cookieService, cryptoService));
  });

});
